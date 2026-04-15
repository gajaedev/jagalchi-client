import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock @stomp/stompjs Client as a class constructor
const mockActivate = vi.fn();
const mockDeactivate = vi.fn().mockResolvedValue(undefined);
const mockSubscribe = vi.fn().mockReturnValue({ unsubscribe: vi.fn() });
const mockPublish = vi.fn();

vi.mock('@stomp/stompjs', () => {
  const MockClient = vi.fn(function (
    this: Record<string, unknown>,
    config: Record<string, unknown>,
  ) {
    Object.assign(this, config);
    this.connected = false;
    this.active = false;
    this.activate = mockActivate;
    this.deactivate = mockDeactivate;
    this.subscribe = mockSubscribe;
    this.publish = mockPublish;
    if (!this.connectHeaders) this.connectHeaders = {};
  });
  return { Client: MockClient };
});

vi.mock('@/api/client', () => ({
  getAccessToken: vi.fn().mockReturnValue('test-token'),
}));

import {
  getStompClient,
  connectStomp,
  disconnectStomp,
  subscribeStomp,
  publishStomp,
} from './stomp-client';

describe('stomp-client', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    // Reset singleton by disconnecting
    await disconnectStomp();
  });

  describe('getStompClient', () => {
    it('creates a new Client with correct config', () => {
      const client = getStompClient();
      expect(client).toBeDefined();
      expect(client.brokerURL).toBeDefined();
      expect(client.reconnectDelay).toBe(3000);
      expect(client.heartbeatIncoming).toBe(10000);
      expect(client.heartbeatOutgoing).toBe(10000);
    });

    it('passes userId/userRole/roadmapId to connectHeaders via beforeConnect', () => {
      const client = getStompClient({
        userId: '42',
        userRole: 'USER',
        roadmapId: '1',
      });

      // Simulate beforeConnect callback
      const beforeConnect = client.beforeConnect as (() => void) | undefined;
      beforeConnect?.();

      expect(client.connectHeaders).toEqual(
        expect.objectContaining({
          Authorization: 'Bearer test-token',
          'X-User-ID': '42',
          'X-User-Role': 'USER',
          'X-Roadmap-ID': '1',
        }),
      );
    });

    it('omits headers when options not provided', () => {
      const client = getStompClient();

      const beforeConnect = client.beforeConnect as (() => void) | undefined;
      beforeConnect?.();

      expect(client.connectHeaders).toEqual(
        expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      );
      expect(client.connectHeaders).not.toHaveProperty('X-User-ID');
    });
  });

  describe('connectStomp', () => {
    it('activates the client', () => {
      connectStomp();
      expect(mockActivate).toHaveBeenCalled();
    });
  });

  describe('disconnectStomp', () => {
    it('deactivates and resets the client', async () => {
      connectStomp();
      await disconnectStomp();
      // After disconnect, subscribe should return null (no client)
      const result = subscribeStomp('/topic/test', vi.fn());
      expect(result).toBeNull();
    });
  });

  describe('subscribeStomp', () => {
    it('returns null when not connected', () => {
      const result = subscribeStomp('/topic/test', vi.fn());
      expect(result).toBeNull();
    });
  });

  describe('publishStomp', () => {
    it('does nothing when not connected', () => {
      publishStomp('/app/test', { data: 'hello' });
      expect(mockPublish).not.toHaveBeenCalled();
    });

    it('sends message with headers when connected', () => {
      // Need a connected client to test publish
      const client = getStompClient();
      // Simulate connected state
      (client as unknown as Record<string, unknown>).connected = true;

      publishStomp('/app/test', { data: 'hello' }, { 'X-User-ID': '42' });

      expect(mockPublish).toHaveBeenCalledWith({
        destination: '/app/test',
        headers: { 'X-User-ID': '42' },
        body: JSON.stringify({ data: 'hello' }),
      });
    });
  });
});

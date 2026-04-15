import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/stomp-client', () => ({
  publishStomp: vi.fn(),
}));

import { publishStomp } from '@/lib/stomp-client';
import {
  dispatchAction,
  handleAck,
  handleNack,
  getPendingCount,
  sendCursorPosition,
  sendCursorHide,
  setCurrentUser,
} from './action-dispatcher';

describe('action-dispatcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('dispatchAction sends STOMP message and returns actionId', () => {
    const actionId = dispatchAction('roadmap-1', 'CREATE');
    expect(actionId).toBeTruthy();
    expect(publishStomp).toHaveBeenCalledWith(
      '/app/roadmap/roadmap-1/action',
      expect.objectContaining({
        actionId,
        roadmap: 'roadmap-1',
        action: 'CREATE',
      }),
      expect.any(Object),
    );
  });

  it('dispatchAction sends X-User-ID and X-User-Role headers when set', () => {
    setCurrentUser('42', 'USER');
    dispatchAction('rm-1', 'EDIT');

    expect(publishStomp).toHaveBeenCalledWith(
      '/app/roadmap/rm-1/action',
      expect.any(Object),
      expect.objectContaining({
        'X-User-ID': '42',
        'X-User-Role': 'USER',
      }),
    );
  });

  it('handleAck removes pending action', () => {
    const actionId = dispatchAction('roadmap-1', 'EDIT');
    expect(handleAck(actionId)).toBe(true);
    expect(handleAck(actionId)).toBe(false); // already removed
  });

  it('handleNack returns action and removes from pending', () => {
    const actionId = dispatchAction('roadmap-1', 'DELETE');
    const result = handleNack(actionId);
    expect(result.isFound).toBe(true);
    expect(result.action?.actionId).toBe(actionId);
  });

  it('handleNack returns isFound false for unknown actionId', () => {
    const result = handleNack('unknown-id');
    expect(result.isFound).toBe(false);
    expect(result.action).toBeUndefined();
  });

  it('sendCursorPosition publishes with userId', () => {
    sendCursorPosition('rm-1', { userId: 42, userName: 'alice', x: 100, y: 200 });
    expect(publishStomp).toHaveBeenCalledWith(
      '/app/roadmap/rm-1/cursor',
      expect.objectContaining({
        userId: 42,
        userName: 'alice',
        x: 100,
        y: 200,
        state: 'NORMAL',
        timestamp: expect.any(Number),
      }),
      expect.any(Object),
    );
  });

  it('sendCursorHide publishes with headers', () => {
    setCurrentUser('42', 'USER');
    sendCursorHide('rm-1');
    expect(publishStomp).toHaveBeenCalledWith(
      '/app/roadmap/rm-1/cursor/hide',
      {},
      expect.objectContaining({ 'X-User-ID': '42' }),
    );
  });

  it('getPendingCount tracks pending actions', () => {
    const id1 = dispatchAction('rm-1', 'CREATE');
    const id2 = dispatchAction('rm-1', 'EDIT');
    const countBefore = getPendingCount();
    expect(countBefore).toBeGreaterThanOrEqual(2);
    handleAck(id1);
    handleAck(id2);
  });
});

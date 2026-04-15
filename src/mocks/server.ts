import { setupServer } from 'msw/node';

import { handlers } from './handlers';

/** Node 환경용 MSW 서버 (Vitest, E2E 등) */
export const server = setupServer(...handlers);

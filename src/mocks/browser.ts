import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

/** 브라우저 환경용 MSW 서비스 워커 (개발 서버) */
export const worker = setupWorker(...handlers);

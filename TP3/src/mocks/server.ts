import { setupServer } from 'msw/node';
import { handlers } from './handlers';
// PARA TESTS

export const server = setupServer(...handlers);

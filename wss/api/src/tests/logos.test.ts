import sup from 'supertest';
import app from '../app';
// import { connect } from '../db';
import { APP_ROUTER_PATHS } from '../constants/app';
// import { LogoModel } from '../models';

const request = sup.agent(app.callback());

describe('logos', () => {
  it('should return 100 logos', () => {
    request
      .get(APP_ROUTER_PATHS.LOGOS)
      .expect(200);
  });
});

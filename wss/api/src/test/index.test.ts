import supertest from 'supertest';
import app from '../app';
import { DB_FILES, ROUTER_PATHS } from '../constants';
import readJson from '../utils/read-json';

const request = supertest.agent(app.callback());

describe(DB_FILES.INFO, () => {
  it(`should return ${DB_FILES.INFO}`, (done) => {
    request
      .get(ROUTER_PATHS.HOME)
      .expect(200)
      .expect(readJson(DB_FILES.INFO), done);
  });
});

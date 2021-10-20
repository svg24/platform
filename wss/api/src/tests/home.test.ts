import supertest from 'supertest';
import app from '../app';
import { APP_ROUTER_PATHS } from '../constants/app';
import { DB_FILE_NAMES } from '../constants/db';
import { readJson } from '../utils';

const request = supertest.agent(app.callback());

describe(DB_FILE_NAMES.INFO, () => {
  it(`should return ${DB_FILE_NAMES.INFO}`, (done) => {
    request
      .get(APP_ROUTER_PATHS.HOME)
      .expect(200)
      .expect(readJson(DB_FILE_NAMES.INFO), done);
  });
});

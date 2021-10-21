import db from 'mongoose';
import { connect } from '../db';
import { isProd } from '../utils';

export const mochaHooks: Mocha.RootHookObject = {
  beforeAll(done) {
    if (isProd()) {
      connect();
    }

    done();
  },
  afterAll(done) {
    if (isProd()) {
      db.connection.close();
    }

    done();
  },
};

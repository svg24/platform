import mongoose from 'mongoose';
import { db, node } from '../core';

export const mochaHooks: Mocha.RootHookObject = {
  beforeAll(done) {
    if (node.isProd) {
      db.connect();
    }

    done();
  },
  afterAll(done) {
    if (node.isProd) {
      mongoose.connection.close();
    }

    done();
  },
};

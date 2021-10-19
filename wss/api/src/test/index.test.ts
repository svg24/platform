import supertest from 'supertest';
import app from '../app';

const request = supertest.agent(app.callback());

describe('hi', () => {
  it('should say "hi"', (done) => {
    request
      .get('/')
      .expect(200)
      .expect('hi', done);
  });
});

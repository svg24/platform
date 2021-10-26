export class Node {
  #opts = {
    env: process.env.NODE_ENV,
  }

  get isProd(): boolean {
    return this.#opts.env === 'production';
  }
}

export default new Node();

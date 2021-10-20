import { exec } from 'child_process';
import db from 'mongoose';
import { DB } from './constants/db';

export const connect = (): Promise<void> => (
  db.connect(DB.URI, {
    user: DB.USER,
    pass: DB.PASS,
  }).then(() => {
    console.log('db: connected');

    exec('sh /srv/db/init.sh', (err) => {
      if (err) {
        console.error('db: init error: ', err);
      } else {
        console.log('db: initd');
      }
    });
  }).catch((err) => {
    console.error('db: connected error: ', err);
    setTimeout(connect, 3000);
  })
);

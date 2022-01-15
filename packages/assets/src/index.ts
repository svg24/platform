import http from 'http';
import { listener } from './listener';

http.createServer(listener).listen(process.env.SERVER_PORT);

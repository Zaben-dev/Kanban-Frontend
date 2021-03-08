import { createServer, Response } from 'miragejs';

const server = () => {
  createServer({
    routes() {
      this.get('/columns', () => {
        return {
          columns: [
            {
              id: '1',
              name: 'backlog',
              limit: '10',
            },
            {
              id: '2',
              name: 'to do',
              limit: '5',
            },
            {
              id: '3',
              name: 'completed',
              limit: '5',
            },
            {
              id: '4',
              name: 'backlog',
              limit: '10',
            },
            {
              id: '5',
              name: 'kolumna',
              limit: '10',
            },
          ],
        };
        // return new Response(500, {}, {});
      });
      this.delete('/column/1', () => {
        return {
          ok: 'ok',
        };
      });
    },
  });
};

export default server;

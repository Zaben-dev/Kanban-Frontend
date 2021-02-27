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
          ],
        };
        // return new Response(500, {}, {});
      });
    },
  });
};

export default server;

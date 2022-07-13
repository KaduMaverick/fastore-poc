import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from 'graphql-pvst/src/resolvers';
import { typeDefs } from 'graphql-pvst/src/schemas';

const serverPort = '4000';

const app = express();

app.use(express.json());



async function startServer() {
  const server = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
    formatError: (error) => {
      return error;
    },
    context: ({ req, res }) => {
      return {
        req,
        res,
      };
    },
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' })
}
startServer();

app.listen(serverPort);

// eslint-disable-next-line no-console
console.log(
  `🚀 GraphQL server ready at http://localhost:${serverPort}/graphql`
);

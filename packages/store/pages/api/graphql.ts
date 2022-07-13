import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { resolvers } from 'graphql-pvst/src/resolvers';
import { typeDefs } from 'graphql-pvst/src/schemas';

const cors = Cors();
const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const startServer = apolloServer.start();

export default cors(async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// instanciando o client
const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_ENDPOINT}/api/graphql`,
  cache: new InMemoryCache(),
});

export { client };

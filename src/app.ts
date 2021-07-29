import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import handleContext from './config/auth';

export default async function initServer(): Promise<void> {
  try {
    const server = new ApolloServer({
      cors: true,
      schema: await buildSchema({
        resolvers: [`${__dirname}/graphql/resolvers/**/*.{ts,js}`],
        validate: false,
      }),
      context: handleContext,
    });

    const { url } = await server.listen();
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at ${url}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

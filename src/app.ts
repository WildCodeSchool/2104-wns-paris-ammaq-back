import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

export default async function initServer(): Promise<void> {
  try {
    const PORT = process.env.SERVER_PORT || 4000;
    const server = new ApolloServer({
      cors: true,
      schema: await buildSchema({
        resolvers: [`${__dirname}/graphql/resolvers/**/*.{ts,js}`],
        validate: false,
      }),
    });

    const { url } = await server.listen({ port: PORT});
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at ${url}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

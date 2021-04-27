import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';


export default async function initServer() {
  try {
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [__dirname + '/graphql/resolvers/**/*.{ts,js}'],
        validate: false,
      }),
    });

    const { url } = await server.listen();
    console.log(`🚀 Server ready at ${url}`);
  } catch (err) {
    console.log(err)
  }
}
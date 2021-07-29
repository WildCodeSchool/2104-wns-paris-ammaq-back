import { ApolloServer, AuthenticationError } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import jwt from 'jsonwebtoken';
import Payload from './graphql/types/Payload';

const jwtKey = process.env.JWT_KEY as string;

export default async function initServer(): Promise<void> {
  try {
    const server = new ApolloServer({
      cors: true,
      schema: await buildSchema({
        resolvers: [`${__dirname}/graphql/resolvers/**/*.{ts,js}`],
        validate: false,
      }),
      context: ({ req }): Payload => {
        const token = req.headers.authorization;
        if (token) {
          let payload;
          try {
            payload = jwt.verify(token, jwtKey) as Payload;
            return payload;
          } catch (err) {
            throw new AuthenticationError(err);
          }
        }
        return {};
      },
    });

    const { url } = await server.listen();
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at ${url}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

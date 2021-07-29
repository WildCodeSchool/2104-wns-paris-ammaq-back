import {
  Resolver, Query, Arg,
} from 'type-graphql';
import * as argon2 from 'argon2';
import { ApolloError, AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import LoginInput from '../inputs/login.input';
import { UserModel } from '../../entities/user.entity';
import Payload from '../types/Payload';

const jwtKey = process.env.JWT_KEY as string;

@Resolver()
export default class LoginResolver {
  @Query(() => String)
  async login(@Arg('input') input: LoginInput): Promise<string> {
    try {
      const user = await UserModel.findOne({ email: input.email }).exec();
      if (user && await argon2.verify(user.password, input.password)) {
        const payload: Payload = { user: user.email };
        const token = jwt.sign(payload, jwtKey);
        return token;
      }
      throw new AuthenticationError('invalid credentials');
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}

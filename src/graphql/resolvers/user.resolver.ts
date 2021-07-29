import {
  Resolver, Query, Arg, ID, Mutation,
} from 'type-graphql';
import UserInput from '../inputs/user.input';
import { User, UserModel } from '../../entities/user.entity';
import { ApolloError } from 'apollo-server';

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await UserModel.find().exec();

    return users;
  }

  @Query(() => User)
  async user(@Arg('id', () => ID) id: string): Promise<User> {
    const user = await UserModel.findById(id).exec();

    if (!user) throw new Error('user not found');

    return user;
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: UserInput): Promise<User> {
    try {
      const user = new UserModel(input);

    await user.save();

    return user;
    } catch (error) {
      if (error.code === 11000 && error.name === "MongoError") {
        throw new ApolloError("Duplicate Key")
      }
      throw new ApolloError(error);
    }
    
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('id', () => ID) id: string,
      @Arg('input') input: UserInput,
  ): Promise<User> {
    const user = await UserModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!user) throw new Error('user not found');

    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Arg('id', () => ID) id: string): Promise<User> {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) throw new Error('user not found');

    return user;
  }
}

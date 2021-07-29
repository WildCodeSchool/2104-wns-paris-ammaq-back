import {
  Resolver, Query, Arg, ID, Mutation,
} from 'type-graphql';
import * as argon2 from 'argon2';
import UserInput from '../inputs/user.input';
import { User, UserModel } from '../../entities/user.entity';

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
    const hash = await argon2.hash(input.password);
    const user = new UserModel({ ...input, password: hash });

    await user.save();

    return user;
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

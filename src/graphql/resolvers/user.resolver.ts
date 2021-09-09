import {
  Resolver, Query, Arg, ID, Mutation,
} from 'type-graphql';
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

  @Query(() => User)
  async userByMail(@Arg('email') email: string): Promise<User> {
    const user = await UserModel.findOne({ email: email }).exec();
    
    if (!user) throw new Error('no user found');

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

import {
  Resolver, Query, Arg, ID, Mutation,
} from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ApolloError } from 'apollo-server';
import UserInput from '../inputs/user.input';
import { User, UserModel } from '../../entities/user.entity';
import { uploadFile, deleteFile } from '../../utils/UploadFile';

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
  async createUser(
    @Arg('input') input: UserInput,
      @Arg('file', () => GraphQLUpload) file: FileUpload,
  ): Promise<User> {
    const avatar = await uploadFile(file);
    const user = new UserModel({ ...input, avatar });

    try {
      await user.save();
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        if (user.avatar) deleteFile(user.avatar);
        throw new ApolloError('duplicate value');
      }
    }

    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('id', () => ID) id: string,
      @Arg('input') input: UserInput,
      @Arg('file', () => GraphQLUpload, { nullable: true }) file?: FileUpload,
  ): Promise<User> {
    const oldUser = await UserModel.findById(id).exec();
    if (!oldUser) throw new ApolloError('user not found');
    let { avatar } = oldUser;
    if (file) {
      if (oldUser.avatar) deleteFile(oldUser.avatar);
      avatar = await uploadFile(file);
    }

    const user = await UserModel.findByIdAndUpdate(id, { ...input, avatar });
    if (!user) throw new ApolloError('user not found');

    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Arg('id', () => ID) id: string): Promise<User> {
    const user = await UserModel.findByIdAndDelete(id);
    if (user?.avatar) {
      deleteFile(user.avatar);
    } else {
      throw new ApolloError('user not found');
    }

    return user;
  }
}

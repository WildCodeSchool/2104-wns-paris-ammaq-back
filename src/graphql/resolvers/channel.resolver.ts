import {
  Resolver, Query, Arg, ID, Mutation,
} from 'type-graphql';
import ChannelInput from '../inputs/channel.input';
import { Channel, ChannelModel } from '../../entities/channel.entity';

@Resolver(Channel)
export default class ChannelResolver {
  @Query(() => [Channel])
  async channels(): Promise<Channel[]> {
    const channels = await ChannelModel.find().exec();

    return channels;
  }

  @Query(() => Channel)
  async channel(@Arg('id', () => ID) id: string): Promise<Channel> {
    const channel = await ChannelModel.findById(id).exec();

    if (!channel) throw new Error('channel not found');

    return channel;
  }

  @Mutation(() => Channel)
  async createChannel(@Arg('input') input: ChannelInput): Promise<Channel> {
    const channel = new ChannelModel(input);

    await channel.save();

    return channel;
  }

  @Mutation(() => Channel)
  async updateChannel(
    @Arg('id', () => ID) id: string,
      @Arg('input') input: ChannelInput,
  ): Promise<Channel> {
    const channel = await ChannelModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!channel) throw new Error('Channel not found');

    return channel;
  }

  @Mutation(() => Channel)
  async deleteChannel(@Arg('id', () => ID) id: string): Promise<Channel> {
    const channel = await ChannelModel.findByIdAndDelete(id);
    if (!channel) throw new Error('channel not found');

    return channel;
  }
}

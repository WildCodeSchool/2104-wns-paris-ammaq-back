import {
  Resolver, Query, Arg, ID, Mutation, PubSub, Subscription, Root,
} from 'type-graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import MessageInput from '../inputs/message.input';
import { Message, MessageModel } from '../../entities/message.entity';

@Resolver(Message)
export default class MessageResolver {
  @Query(() => [Message])
  async messages(): Promise<Message[]> {
    const messages = await MessageModel.find().exec();
    return messages;
  }

  @Query(() => [Message])
  async messagesByChannelId(@Arg('channelId') channelId: string): Promise<Message[]> {
    const messages = await MessageModel.find({ channelId }).exec();

    return messages;
  }

  @Query(() => Message)
  async message(@Arg('id', () => ID) id: string): Promise<Message> {
    const message = await MessageModel.findById(id).exec();

    if (!message) throw new Error('message not found');

    return message;
  }

  @Mutation(() => Message)
  async createMessage(@Arg('input') input: MessageInput, @PubSub() pubSub:PubSubEngine): Promise<Message> {
    const message = new MessageModel(input);

    await message.save();
    console.log('new message', message);

    const JSONmessage = message.toJSON();
    // eslint-disable-next-line no-underscore-dangle
    await pubSub.publish('NEW_MESSAGE', { ...JSONmessage, id: JSONmessage._id });

    return message;
  }

  @Mutation(() => Message)
  async updateMessage(
    @Arg('id', () => ID) id: string,
      @Arg('input') input: MessageInput,
  ): Promise<Message> {
    const message = await MessageModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!message) throw new Error('message not found');

    return message;
  }

  @Mutation(() => Message)
  async deleteMessage(@Arg('id', () => ID) id: string, @PubSub() pubSub:PubSubEngine): Promise<Message> {
    const message = await MessageModel.findByIdAndDelete(id);
    if (!message) throw new Error('message not found');

    await pubSub.publish('DELETE_MESSAGE', message.id);
    console.log(message.id);

    return message;
  }

  @Subscription({ topics: 'DELETE_MESSAGE' })
  deletedMessage(@Root() id: string): string {
    return id;
  }

  @Subscription({ topics: 'NEW_MESSAGE' })
  newMessage(@Root() newMessagePayload: Message): Message {
    return newMessagePayload;
  }
}

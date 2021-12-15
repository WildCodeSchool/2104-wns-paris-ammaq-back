import { InputType, Field } from 'type-graphql';
import { Message } from '../../entities/message.entity';

@InputType()
export default class MessageUpdateInput implements Partial<Message> {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  content!: string;

  @Field(() => String)
  channelId!: string;

  @Field(() => String)
  userId!: string;
}

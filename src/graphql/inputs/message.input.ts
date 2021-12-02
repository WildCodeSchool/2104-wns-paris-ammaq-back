import { InputType, Field } from 'type-graphql';
import { Message } from '../../entities/message.entity';

@InputType()
export default class MessageInput implements Partial<Message> {
  @Field(() => String)
  content!: string;
}

import { InputType, Field } from 'type-graphql';
import { Channel } from '../../entities/channel.entity';

@InputType()
export default class ChannelInput implements Partial<Channel> {
  @Field(() => String)
  name!: string;

  @Field()
  vocal!: boolean;

  @Field({ nullable: true })
  password?: string;
}

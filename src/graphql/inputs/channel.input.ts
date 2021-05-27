import { InputType, Field } from 'type-graphql';
import { Channel } from '../../entities/channel.entity';

@InputType()
export default class ChannelInput implements Partial<Channel> {
  @Field()
  name!: string;

  @Field()
  isVocal!: boolean;

  @Field({ nullable: true })
  password?: string;
}

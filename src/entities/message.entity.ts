import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Message {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ required: true, trim: true })
  content!: string;

  @Field()
  @Prop({ required: true, trim: true })
  channelId!: string;

  @Field()
  @Prop({ required: true, trim: true })
  userId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const MessageModel = getModelForClass(Message, {
  schemaOptions: { timestamps: true },
});

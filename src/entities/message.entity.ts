import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Message {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ required: true, trim: true })
  content!: string;
}

export const MessageModel = getModelForClass(Message, {
  schemaOptions: { timestamps: true },
});

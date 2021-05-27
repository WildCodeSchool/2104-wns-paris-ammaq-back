import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Channel {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, required: true })
  name!: string;

  @Field()
  @Prop({ required: true })
  isVocal!: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const ChannelModel = getModelForClass(Channel, {
  schemaOptions: { timestamps: true },
});

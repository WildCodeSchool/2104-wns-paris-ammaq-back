import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export default class Question {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ required: true, trim: true })
  question!: string;

  @Field()
  @Prop({ required: true, trim: true })
  answer!: string;

  @Field()
  @Prop({ required: true })
  allChoices!: [];
}

export const QuestionModel = getModelForClass(Question, {
  schemaOptions: { timestamps: true },
});

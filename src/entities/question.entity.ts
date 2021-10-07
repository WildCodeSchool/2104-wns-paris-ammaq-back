import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Question {
  @Field(() => ID)
  id?: string;

  @Field()
  @Prop({ required: true, trim: true })
  question!: string;

  @Field()
  @Prop({ required: true, trim: true })
  answer!: string;

  @Field(() => [String])
  @Prop({ required: true })
  allChoices!: [string];
}

export const QuestionModel = getModelForClass(Question, {
  schemaOptions: { timestamps: true },
});

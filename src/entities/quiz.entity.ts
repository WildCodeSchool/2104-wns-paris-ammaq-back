import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';
import Question from './question.entity';

@ObjectType()
export class Quiz {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ required: true, trim: true })
  name!: string;

  @Field(() => [Question])
  @Prop({ required: true })
  questions!: Question[];
}

export const QuizModel = getModelForClass(Quiz, {
  schemaOptions: { timestamps: true },
});

import { InputType, Field } from 'type-graphql';
import { Quiz } from './../../entities/quiz.entity';
import { Question } from './../../entities/question.entity';

@InputType()
export default class QuizInput implements Partial<Quiz>{
  @Field(() => String)
  name!: string;

  @Field(() => [Question])
  questions!: [Question]
}
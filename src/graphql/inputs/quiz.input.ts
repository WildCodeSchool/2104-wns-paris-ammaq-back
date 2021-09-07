import { InputType, Field, ID } from 'type-graphql';
import { Quiz } from './../../entities/quiz.entity';
import { Question } from './../../entities/question.entity';
import QuestionInput from '../inputs/question.input';

@InputType()
export default class QuizInput implements Partial<Quiz>{

  @Field(() => String)
  name!: string;

  @Field(() => [QuestionInput])
  questions!: QuestionInput[]
}
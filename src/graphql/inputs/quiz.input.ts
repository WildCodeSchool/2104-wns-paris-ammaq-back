import { InputType, Field, ID } from 'type-graphql';
import { Quiz } from './../../entities/quiz.entity';
import QuestionInput from '../inputs/question.input';
import ScoreInput from './score.input';

@InputType()
export default class QuizInput implements Partial<Quiz>{

  @Field(() => String)
  name!: string;

  @Field(() => [QuestionInput])
  questions!: QuestionInput[]

  @Field(() => [ScoreInput])
  scores!: ScoreInput[]
}
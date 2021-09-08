import { InputType, Field } from 'type-graphql';
import { Score } from '../../entities/score.entity';

@InputType()
export default class ScoreInput implements Partial<Score> {

  @Field()
  userID!: string;

  @Field()
  quizID!: string;

  @Field()
  score!: number;
  
}

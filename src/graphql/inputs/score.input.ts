import { User } from './../../entities/user.entity';
import { InputType, Field, ID } from 'type-graphql';
import { Score } from '../../entities/score.entity';

@InputType()
export default class ScoreInput implements Partial<Score> {

  @Field()
  score!: number;

  @Field(() => ID)
  userId!: string;
  
}

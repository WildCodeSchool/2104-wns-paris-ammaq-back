import { InputType, Field, ID } from 'type-graphql';
import { Question } from '../../entities/question.entity';

@InputType()
export default class QuestionInput implements Partial<Question> {
  @Field(() => String)
  question!: string;

  @Field(() => String)
  answer!: string;

  @Field(() => [String])
  allChoices!: [string];
}

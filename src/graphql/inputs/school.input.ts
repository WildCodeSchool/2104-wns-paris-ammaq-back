import { InputType, Field } from 'type-graphql';
import { School } from '../../entities/school.entity';
import UserInput from './user.input';

@InputType()
export default class SchoolInput implements Partial<School> {
  @Field()
  name!: string;

  @Field()
  logo!: string;

  @Field(() => [UserInput])
  students!: UserInput[]
}

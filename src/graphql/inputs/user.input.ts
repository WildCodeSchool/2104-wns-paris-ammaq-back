import { InputType, Field } from 'type-graphql';
import { User } from '../../entities/user.entity';
import SchoolInput from './school.input';

@InputType()
export default class UserInput implements Partial<User> {
  @Field(() => String)
  avatar?: string;

  @Field(() => String)
  role!: string;

  @Field(() => String)
  firstname!: string;

  @Field()
  lastname!: string;

  @Field(() => [SchoolInput])
  school!: SchoolInput

  @Field()
  email!: string;

  @Field()
  password!: string;
}

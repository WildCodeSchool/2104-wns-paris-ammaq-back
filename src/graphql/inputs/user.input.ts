import { InputType, Field } from 'type-graphql';
import { User } from '../../entities/user.entity';

@InputType()
export default class UserInput implements Partial<User> {

  @Field(() => String)
  avatar?: string;

  @Field(() => String)
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

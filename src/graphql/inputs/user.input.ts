import { InputType, Field } from 'type-graphql';
import { User } from '../../entities/user.entity';

@InputType()
export default class UserInput implements Partial<User> {
  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field({ nullable: true })
  avatarPath?: string;
}

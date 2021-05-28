import { InputType, Field } from 'type-graphql';
import { School } from '../../entities/school.entity';

@InputType()
export default class SchoolInput implements Partial<School> {
  @Field()
  name!: string;

  @Field()
  logo!: string;
}

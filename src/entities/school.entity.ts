import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user.entity';

@ObjectType()
export class School {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, required: true })
  name!: string;

  @Field()
  @Prop({ trim: true, required: true })
  logo!: string;


  @Field(() => [User])
  @Prop({ ref: 'User', default: [] })
  students!: Ref<User, string>[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const SchoolModel = getModelForClass(School, {
  schemaOptions: { timestamps: true },
});

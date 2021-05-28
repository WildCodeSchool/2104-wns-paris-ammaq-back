import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

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

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const SchoolModel = getModelForClass(School, {
  schemaOptions: { timestamps: true },
});

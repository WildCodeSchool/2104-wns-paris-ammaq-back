import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, required: true })
  firstname!: string;

  @Field()
  @Prop({ trim: true, required: true })
  lastname!: string;

  @Field()
  @Prop({ trim: true, unique: true, required: true })
  email!: string;

  @Prop({ trim: true, required: true })
  password!: string;

  @Field({ nullable: true })
  @Prop({ trim: true })
  avatarPath?: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});

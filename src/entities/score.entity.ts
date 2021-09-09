import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user.entity';

@ObjectType()
export class Score {

  @Field(() => User)
  @Prop({ ref: User })
  userId!: Ref<User>;

  @Field()
  @Prop({ required: true })
  score!: Number;
}

export const ScoreModel = getModelForClass(Score, {
  schemaOptions: { timestamps: true },
});

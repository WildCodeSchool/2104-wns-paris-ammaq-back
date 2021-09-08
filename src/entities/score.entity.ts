import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Score {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, required: true })
  userID!: string;

  @Field()
  @Prop({ trim: true, required: true })
  quizID!: string;

  @Field()
  @Prop({ required: true })
  score!: Number;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const ScoreModel = getModelForClass(Score, {
  schemaOptions: { timestamps: true },
});

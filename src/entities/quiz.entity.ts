import { ObjectType, Field, ID } from "type-graphql";
import { Prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Question } from "./question.entity";
import { Score } from "./score.entity";

@ObjectType()
export class Quiz {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ required: true, trim: true })
  name!: string;

  @Field(() => [Question])
  @Prop({ type: () => Question, default: [] })
  questions!: Ref<Question>[];

  @Field(() => [Score])
  @Prop({ type: () => Score, default: [] })
  scores!: Score[];
}

export const QuizModel = getModelForClass(Quiz, {
  schemaOptions: { timestamps: true },
});

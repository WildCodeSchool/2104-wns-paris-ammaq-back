import { Resolver, Query, Arg, ID, Mutation } from "type-graphql";
import QuizInput from "../inputs/quiz.input";
import { Quiz, QuizModel } from "../../entities/quiz.entity";
import ScoreInput from "../../graphql/inputs/score.input";
import { Score } from "././../../entities/score.entity";
import { UserModel } from "././../../entities/user.entity";

@Resolver(Quiz)
export default class QuizResolver {
  @Query(() => [Quiz])
  async quizzes(): Promise<Quiz[]> {
    const quizzes = await QuizModel.find().exec();

    return quizzes;
  }

  @Query(() => Quiz)
  async quiz(@Arg("id", () => ID) id: string): Promise<Quiz> {
    const quiz = await QuizModel.findById(id).exec();

    if (!quiz) throw new Error("quiz not found");

    return quiz;
  }

  @Mutation(() => Quiz)
  async createQuiz(@Arg("input") input: QuizInput): Promise<Quiz> {
    const quiz = new QuizModel(input);

    await quiz.save();

    return quiz;
  }

  // * Ajouter une muttation pour ajouter un score
  @Mutation(() => Quiz)
  async addScore(
    @Arg("id", () => ID) id: string,
    @Arg("input") input: ScoreInput
  ): Promise<Quiz> {
    const quiz = await QuizModel.findById(id);
    const user = await UserModel.findById(input.userId);
    console.log(quiz);
    if (!quiz) throw new Error("Quiz not found");

    quiz?.scores?.push({ user, score: input.score });

    quiz?.save();

    return quiz;
  }
}

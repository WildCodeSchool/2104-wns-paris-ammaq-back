import {
  Resolver, Query, Arg, ID, Mutation,
} from 'type-graphql';
import QuizInput from '../inputs/quiz.input';
import { Quiz, QuizModel } from '../../entities/quiz.entity';

@Resolver(Quiz)
export default class QuizResolver {
  @Query(() => [Quiz])
  async quizzes(): Promise<Quiz[]> {
    const quizzes = await QuizModel.find().exec();

    return quizzes;
  }

  @Query(() => Quiz)
  async quiz(@Arg('id', () => ID) id: string): Promise<Quiz> {
    const quiz = await QuizModel.findById(id).exec();

    if (!quiz) throw new Error('quiz not found');

    return quiz;
  }

  @Mutation(() => Quiz)
  async createQuiz(@Arg('input') input: QuizInput): Promise<Quiz> {
    const quiz = new QuizModel(input);

    await quiz.save();

    return quiz;
  }

}
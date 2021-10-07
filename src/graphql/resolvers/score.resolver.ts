import {
  Resolver, Query, Arg, ID, Mutation,
} from 'type-graphql';
import ScoreInput from '../inputs/score.input';
import { Score, ScoreModel } from '../../entities/score.entity';

@Resolver(Score)
export default class ScoreResolver {
  @Query(() => [Score])
  async scores(): Promise<Score[]> {
    const scores = await ScoreModel.find().exec();

    return scores;
  }

  @Query(() => Score)
  async score(@Arg('id', () => ID) id: string): Promise<Score> {
    const score = await ScoreModel.findById(id).exec();

    if (!score) throw new Error('Score not found');

    return score;
  }

  @Mutation(() => Score)
  async createScore(@Arg('input') input: ScoreInput): Promise<Score> {
    const score = new ScoreModel(input);

    await score.save();

    return score;
  }

  @Mutation(() => Score)
  async updateScore(
    @Arg('id', () => ID) id: string,
      @Arg('input') input: ScoreInput,
  ): Promise<Score> {
    const score = await ScoreModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!score) throw new Error('score not found');

    return score;
  }

  @Mutation(() => Score)
  async deleteScore(@Arg('id', () => ID) id: string): Promise<Score> {
    const score = await ScoreModel.findByIdAndDelete(id);
    if (!score) throw new Error('score not found');

    return score;
  }
}

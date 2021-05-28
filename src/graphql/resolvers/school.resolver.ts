import {
  Resolver, Query, Arg, ID, Mutation,
} from 'type-graphql';
import SchoolInput from '../inputs/school.input';
import { School, SchoolModel } from '../../entities/school.entity';

@Resolver(School)
export default class SchoolResolver {
  @Query(() => [School])
  async schools(): Promise<School[]> {
    const schools = await SchoolModel.find().exec();

    return schools;
  }

  @Query(() => School)
  async school(@Arg('id', () => ID) id: string): Promise<School> {
    const school = await SchoolModel.findById(id).exec();

    if (!school) throw new Error('School not found');

    return school;
  }

  @Mutation(() => School)
  async createSchool(@Arg('input') input: SchoolInput): Promise<School> {
    const school = new SchoolModel(input);

    await school.save();

    return school;
  }

  @Mutation(() => School)
  async updateSchool(
    @Arg('id', () => ID) id: string,
      @Arg('input') input: SchoolInput,
  ): Promise<School> {
    const school = await SchoolModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!school) throw new Error('school not found');

    return school;
  }

  @Mutation(() => School)
  async deleteSchool(@Arg('id', () => ID) id: string): Promise<School> {
    const school = await SchoolModel.findByIdAndDelete(id);
    if (!school) throw new Error('school not found');

    return school;
  }
}

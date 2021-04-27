import {
  InputType, Field, Int, Float,
} from 'type-graphql';

import { Product } from '../../entities/product.entity';

@InputType()
export default class ProductInput implements Partial<Product> {
  @Field()
  name!: string;

  @Field(() => Int)
  quantity!: number;

  @Field(() => Float)
  price!: number;
}

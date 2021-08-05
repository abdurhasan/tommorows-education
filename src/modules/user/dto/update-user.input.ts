import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/common/types';

@InputType()
export class UpdateUserInput {
  @Field()
  _id: string;
  @Field(() => Role)
  role: Role;
}

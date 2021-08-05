import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/common/types';

@InputType()
export class UpdateUserInput {
  @Field()
  userId: string;
  @Field(() => Role)
  role: Role;
}

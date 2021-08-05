import { Field, InputType } from '@nestjs/graphql';
import { LoginInput } from './login.input';

@InputType()
export class RegisterInput extends LoginInput {
  @Field()
  fullname: string;
}

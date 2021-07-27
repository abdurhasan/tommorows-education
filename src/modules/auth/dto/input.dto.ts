import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
export class RegisterInput extends LoginInput {
  @Field()
  fullname: string;
}

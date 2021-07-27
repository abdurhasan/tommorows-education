import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateChallengeInput {
  @Field()
  student: string;
  @Field()
  description: string;
}

@InputType()
export class StudentAnswerChallengeInput {
  @Field()
  _id: string;
  @Field()
  solution: string;
}

@InputType()
export class TeacherReviewingChallengeInput {
  @Field()
  _id: string;
  @Field()
  comment: string;
  @Field({ nullable: true })
  grade: number;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChallengeInput {
  @Field()
  student: string;
  @Field()
  description: string;
}

@InputType()
export class StudentSubmitAssignmentInput {
  @Field()
  challengeId: string;
  @Field()
  solution: string;
}

@InputType()
export class TeacherReviewingChallengeInput {
  @Field()
  challengeId: string;
  @Field()
  comment: string;
  @Field({ nullable: true })
  grade: number;
}

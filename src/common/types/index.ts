import {
  Field,
  InputType,
  registerEnumType,
  Int,
  ObjectType,
} from '@nestjs/graphql';

export enum Role {
  Admin = 'Admin',
  Teacher = 'Teacher',
  Student = 'Student',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'user roles enum',
});

@InputType()
export class PaginationInput {
  @Field(() => Int)
  page: number;
  @Field(() => Int)
  limit: number;
}

@ObjectType()
export class PaginationResponse {
  @Field(() => Int)
  totalPage: number;
  @Field(() => Int)
  totalData: number;
}

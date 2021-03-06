import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from 'src/common/types';
import { Challenge } from 'src/models/challenge.model';

@ObjectType()
export class GetChallengeResponse extends PaginationResponse {
  @Field(() => [Challenge])
  data: Challenge[];
}

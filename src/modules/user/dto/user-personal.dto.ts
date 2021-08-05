import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from 'src/common/types';
import { User } from 'src/models/user.model';

@ObjectType()
export class UserPersonal extends User {
  @Field(() => Role)
  role: Role;
}

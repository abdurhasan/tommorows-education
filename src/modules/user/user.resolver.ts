import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/common/types';
import { Roles } from 'src/decorator/role.decorator';
import { CurrentUser } from 'src/decorator/user.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { User } from 'src/models/user.model';
import { UpdateUserInput } from './dto/update-user.input';
import { UserPersonal } from './dto/user-personal.dto';

import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Query(() => UserPersonal)
  currentUser(@CurrentUser() user) {
    return user;
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Mutation(() => Boolean)
  async updateUserRole(@Args('params') params: UpdateUserInput) {
    try {      
      if (params.role === Role.Admin) {
        throw new Error('can not assign to admin role');
      }
      await this.service.updateUserRole(params);
      return true;
    } catch (error) {
      throw error;
    }
  }

  @Query(() => [User])
  async getListUsers() {
    try {
      return await this.service.getListUsers();
    } catch (error) {
      throw error;
    }
  }
}

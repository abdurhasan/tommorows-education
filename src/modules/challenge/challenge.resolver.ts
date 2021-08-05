import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PaginationInput, Role } from 'src/common/types';
import { Roles } from 'src/decorator/role.decorator';
import { CurrentUser } from 'src/decorator/user.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Challenge } from 'src/models/challenge.model';
import { User } from 'src/models/user.model';
import { UserService } from '../user/user.service';
import { ChallengeService } from './challenge.service';
import {
  CreateChallengeInput,
  StudentSubmitAssignmentInput,
  TeacherReviewingChallengeInput,
} from './dto/input.dto';
import { GetChallengeResponse } from './dto/response.dto';

@Resolver(Challenge)
export class ChallengeResolver {
  constructor(
    private readonly service: ChallengeService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  @Mutation(() => Challenge)
  async createChallenge(
    @Args('params') params: CreateChallengeInput,
    @CurrentUser() teacher: User,
  ) {
    const data = await this.service.createChallenge(params, teacher);
    return data;
  }

  @Query(() => GetChallengeResponse)
  async getChallenges(
    @Args('params') params: PaginationInput,
    @CurrentUser() user: User,
  ) {
    return await this.service.getChallenges({
      page: params.page,
      limit: params.limit,
      user,
    });
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Student)
  @Mutation(() => Boolean)
  async studentSubmitAssignment(
    @Args('params') params: StudentSubmitAssignmentInput,
    @CurrentUser() student: User,
  ) {
    await this.service.studentSubmitAssignment(params, student);
    return true;
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  @Mutation(() => Boolean)
  async teacherReviewingChallenge(
    @Args('params') params: TeacherReviewingChallengeInput,
    @CurrentUser() teacher: User,
  ) {
    await this.service.teacherReviewingChallenge(params, teacher);
    return true;
  }

  @ResolveField()
  async student(@Parent() challenge: Challenge) {
    const { student } = challenge;
    return await this.userService.userFindOne(student);
  }

  @ResolveField()
  async reviewer(@Parent() challenge: Challenge) {
    const { reviewer } = challenge;
    return await this.userService.userFindOne(reviewer);
  }

  @ResolveField()
  async createdBy(@Parent() challenge: Challenge) {
    const { createdBy } = challenge;
    return await this.userService.userFindOne(createdBy);
  }
}

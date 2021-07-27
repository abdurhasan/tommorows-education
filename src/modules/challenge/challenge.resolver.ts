import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { PaginationInput, Role } from "src/common/types";
import { Roles } from "src/decorator/role.decorator";
import { CurrentUser } from "src/decorator/user.decorator";
import { RolesGuard } from "src/guards/roles.guard";
import { Challenge } from "src/models/challenge.model";
import { User } from "src/models/user.model";
import { ChallengeService } from "./challenge.service";
import {
  CreateChallengeInput,
  StudentAnswerChallengeInput,
  TeacherReviewingChallengeInput,
} from "./dto/input.dto";
import { UserGetChallengeResponse } from "./dto/response.dto";

@Resolver()
export class ChallengeResolver {
  constructor(private readonly service: ChallengeService) { }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  @Mutation(() => Challenge)
  async createChallenge(
    @Args("params") params: CreateChallengeInput,
    @CurrentUser() teacher: User
  ) {
    return await this.service.createChallenge(params, teacher);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Student)
  @Mutation(() => Boolean)
  async studentAnswerChallenge(
    @Args("params") params: StudentAnswerChallengeInput,
    @CurrentUser() student: User
  ) {
    await this.service.studentAnswerChallenge(params, student);
    return true;
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  @Mutation(() => Boolean)
  async teacherReviewingChallenge(
    @Args("params") params: TeacherReviewingChallengeInput,
    @CurrentUser() teacher: User
  ) {
    await this.service.teacherReviewingChallenge(params, teacher);
    return true;
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Student)
  @Query(() => UserGetChallengeResponse)
  async studentGetChallenge(
    @Args("params") params: PaginationInput,
    @CurrentUser() student: User
  ) {
    return await this.service.getChallenges({
      page: params.page,
      limit: params.limit,
      student: student._id.toString(),
    });
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  @Query(() => UserGetChallengeResponse)
  async teacherGetChallenge(
    @Args("params") params: PaginationInput,
  ) {
    return await this.service.getChallenges({
      page: params.page,
      limit: params.limit,
      student: '',
    });
  }
}

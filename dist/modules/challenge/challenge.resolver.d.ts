import { PaginationInput } from 'src/common/types';
import { Challenge } from 'src/models/challenge.model';
import { User } from 'src/models/user.model';
import { UserService } from '../user/user.service';
import { ChallengeService } from './challenge.service';
import { CreateChallengeInput, StudentSubmitAssignmentInput, TeacherReviewingChallengeInput } from './dto/input.dto';
import { GetChallengeResponse } from './dto/response.dto';
export declare class ChallengeResolver {
    private readonly service;
    private readonly userService;
    constructor(service: ChallengeService, userService: UserService);
    createChallenge(params: CreateChallengeInput, teacher: User): Promise<Challenge>;
    getChallenges(params: PaginationInput, user: User): Promise<GetChallengeResponse>;
    studentSubmitAssignment(params: StudentSubmitAssignmentInput, student: User): Promise<boolean>;
    teacherReviewingChallenge(params: TeacherReviewingChallengeInput, teacher: User): Promise<boolean>;
    student(challenge: Challenge): Promise<User>;
    reviewer(challenge: Challenge): Promise<User>;
    createdBy(challenge: Challenge): Promise<User>;
}

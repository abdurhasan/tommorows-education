import { Challenge } from 'src/models/challenge.model';
import { User } from 'src/models/user.model';
import { MongoRepository, Repository } from 'typeorm';
import { CreateChallengeInput, StudentSubmitAssignmentInput, TeacherReviewingChallengeInput } from './dto/input.dto';
import { GetChallengeResponse } from './dto/response.dto';
export declare class ChallengeService {
    private repository;
    private userRepository;
    constructor(repository: MongoRepository<Challenge>, userRepository: Repository<User>);
    createChallenge(params: CreateChallengeInput, teacher: User): Promise<Challenge>;
    studentSubmitAssignment(params: StudentSubmitAssignmentInput, student: User): Promise<void>;
    validateChallenge(challengeId: string, user: User): Promise<void>;
    teacherReviewingChallenge(params: TeacherReviewingChallengeInput, teacher: User): Promise<void>;
    getChallenges({ page, limit, user, }: {
        page: number;
        limit: number;
        user: User;
    }): Promise<GetChallengeResponse>;
}

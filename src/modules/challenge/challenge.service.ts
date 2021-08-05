import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/models/challenge.model';
import { User } from 'src/models/user.model';
import { MongoRepository, Repository } from 'typeorm';
import {
  CreateChallengeInput,
  StudentSubmitAssignmentInput,
  TeacherReviewingChallengeInput,
} from './dto/input.dto';
import * as isEmpty from 'is-empty';
import { ObjectId } from 'mongodb';
import { Role } from 'src/common/types';
import { GetChallengeResponse } from './dto/response.dto';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge) private repository: MongoRepository<Challenge>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createChallenge(
    params: CreateChallengeInput,
    teacher: User,
  ): Promise<Challenge> {
    try {
      const student = await this.userRepository.findOne(params.student);
      if (isEmpty(student)) {
        throw new Error(`${params.student} is not found`);
      }
      const newChallenge = new Challenge({
        ...params,
        createdBy: teacher._id.toString(),
      });

      return await this.repository.save(newChallenge);
    } catch (error) {
      throw error;
    }
  }

  async studentSubmitAssignment(
    params: StudentSubmitAssignmentInput,
    student: User,
  ): Promise<void> {
    try {
      await this.validateChallenge(params.challengeId, student);
      await this.repository.update(
        {
          _id: new ObjectId(params.challengeId),
        },
        { solution: params.solution },
      );
    } catch (error) {
      throw error;
    }
  }

  async validateChallenge(challengeId: string, user: User): Promise<void> {
    try {
      const challenge: Challenge = await this.repository.findOne(challengeId);
      if (isEmpty(challenge)) {
        throw new Error(`${challengeId} is not found`);
      }

      if (user.role === Role.Student) {
        if (!(user._id.toString() === challenge.student)) {
          throw new Error('this challenge is not for you');
        }
        if (!isEmpty(challenge.solution)) {
          throw new Error('you already answer the challenge');
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async teacherReviewingChallenge(
    params: TeacherReviewingChallengeInput,
    teacher: User,
  ): Promise<void> {
    await this.validateChallenge(params.challengeId, teacher);
    await this.repository.update(
      {
        _id: new ObjectId(params.challengeId),
      },
      {
        comment: params.comment,
        grade: params.grade || 0,
        reviewer: teacher._id.toString(),
      },
    );
  }

  async getChallenges({
    page,
    limit,
    user,
  }: {
    page: number;
    limit: number;
    user: User;
  }): Promise<GetChallengeResponse> {
    const take: number = limit > 0 ? Number(limit) : 20;
    const skip: number = page > 0 ? (page - 1) * limit : 0;
    const where = {};
    if (user.role === Role.Student) {
      where['student'] = user._id.toString();
    }
    const [data, totalData] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      take,
      skip,
    });

    return {
      totalData,
      totalPage: Math.ceil(totalData / limit),
      data,
    };
  }
}

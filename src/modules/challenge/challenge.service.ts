import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Challenge } from "src/models/challenge.model";
import { User } from "src/models/user.model";
import { MongoRepository, Repository } from "typeorm";
import {
  CreateChallengeInput,
  StudentAnswerChallengeInput,
  TeacherReviewingChallengeInput,
} from "./dto/input.dto";
import * as isEmpty from "is-empty";
import { ObjectId } from "mongodb";
import { Role } from "src/common/types";
import { groupBy } from "src/common/helpers/data-parser.helper";

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge) private repository: MongoRepository<Challenge>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async createChallenge(params: CreateChallengeInput, teacher: User) {
    try {
      const student = await this.userRepository.findOne(params.student);
      if (isEmpty(student)) {
        throw new Error(`${params.student} is not found`);
      }
      const newChallenge = new Challenge({
        ...params,
        reviewer: teacher._id.toString(),
      });
      await this.repository.save(newChallenge);

      return {
        ...newChallenge,
        reviewer: teacher,
        student,
      };
    } catch (error) {
      throw error;
    }
  }

  async studentAnswerChallenge(
    params: StudentAnswerChallengeInput,
    student: User
  ) {
    try {
      await this.validateChallenge(params._id, student);
      await this.repository.update(
        {
          _id: new ObjectId(params._id),
        },
        { solution: params.solution }
      );
    } catch (error) {
      throw error;
    }
  }

  async validateChallenge(challengeId: string, user: User) {
    try {
      const challenge: Challenge = await this.repository.findOne(challengeId);
      if (isEmpty(challenge)) {
        throw new Error(`${challengeId} is not found`);
      }

      if (user.role === Role.Student) {
        if (!(user._id.toString() === challenge.student)) {
          throw new Error("this challenge is not for you");
        }
        if (!isEmpty(challenge.solution)) {
          throw new Error("you already answer the challenge");
        }
      } else {
        if (!(user._id.toString() === challenge.reviewer)) {
          throw new Error("you can not review this challenge");
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async teacherReviewingChallenge(
    params: TeacherReviewingChallengeInput,
    teacher: User
  ) {
    await this.validateChallenge(params._id, teacher);
    await this.repository.update(
      {
        _id: new ObjectId(params._id),
      },
      { comment: params.comment, grade: params.grade }
    );
  }

  async getChallenges({
    page,
    limit,
    student,
  }: {
    page: number;
    limit: number;
    student?: string;
  }) {
    const take: number = limit > 0 ? Number(limit) : 20;
    const skip: number = page > 0 ? (page - 1) * limit : 0;
    const where = {};
    if (!isEmpty(student)) {
      where['student'] = student
    }
    const [data, totalData] = await this.repository.findAndCount({
      where,
      order: { createdAt: "DESC" },
      take,
      skip,
    });

    return {
      totalData,
      totalPage: Math.ceil(totalData / limit),
      data: await this.challengeJoinUser(data),
    };
  }

  async challengeJoinUser(data: Challenge[]) {
    const userIds = new Set();

    data.map((snap) => {
      userIds.add(new ObjectId(snap.student));
      userIds.add(new ObjectId(snap.reviewer));
    });

    const getUsers = await this.userRepository.find({
      where: { _id: { $in: Array.from(userIds) } },
    });

    const userList = groupBy(getUsers, "_id", true);

    data.map((snap) => {
      snap.student = userList[snap.student];
      snap.reviewer = userList[snap.reviewer];
    });

    return data;
  }
}

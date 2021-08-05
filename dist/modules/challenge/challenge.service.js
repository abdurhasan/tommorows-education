"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const challenge_model_1 = require("../../models/challenge.model");
const user_model_1 = require("../../models/user.model");
const typeorm_2 = require("typeorm");
const isEmpty = require("is-empty");
const mongodb_1 = require("mongodb");
const types_1 = require("../../common/types");
let ChallengeService = class ChallengeService {
    constructor(repository, userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }
    async createChallenge(params, teacher) {
        try {
            const student = await this.userRepository.findOne(params.student);
            if (isEmpty(student)) {
                throw new Error(`${params.student} is not found`);
            }
            const newChallenge = new challenge_model_1.Challenge(Object.assign(Object.assign({}, params), { createdBy: teacher._id.toString() }));
            return await this.repository.save(newChallenge);
        }
        catch (error) {
            throw error;
        }
    }
    async studentSubmitAssignment(params, student) {
        try {
            await this.validateChallenge(params.challengeId, student);
            await this.repository.update({
                _id: new mongodb_1.ObjectId(params.challengeId),
            }, { solution: params.solution });
        }
        catch (error) {
            throw error;
        }
    }
    async validateChallenge(challengeId, user) {
        try {
            const challenge = await this.repository.findOne(challengeId);
            if (isEmpty(challenge)) {
                throw new Error(`${challengeId} is not found`);
            }
            if (user.role === types_1.Role.Student) {
                if (!(user._id.toString() === challenge.student)) {
                    throw new Error('this challenge is not for you');
                }
                if (!isEmpty(challenge.solution)) {
                    throw new Error('you already answer the challenge');
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
    async teacherReviewingChallenge(params, teacher) {
        await this.validateChallenge(params.challengeId, teacher);
        await this.repository.update({
            _id: new mongodb_1.ObjectId(params.challengeId),
        }, {
            comment: params.comment,
            grade: params.grade || 0,
            reviewer: teacher._id.toString(),
        });
    }
    async getChallenges({ page, limit, user, }) {
        const take = limit > 0 ? Number(limit) : 20;
        const skip = page > 0 ? (page - 1) * limit : 0;
        const where = {};
        if (user.role === types_1.Role.Student) {
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
};
ChallengeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(challenge_model_1.Challenge)),
    __param(1, typeorm_1.InjectRepository(user_model_1.User)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository,
        typeorm_2.Repository])
], ChallengeService);
exports.ChallengeService = ChallengeService;
//# sourceMappingURL=challenge.service.js.map
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
exports.ChallengeResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../../common/types");
const role_decorator_1 = require("../../decorator/role.decorator");
const user_decorator_1 = require("../../decorator/user.decorator");
const roles_guard_1 = require("../../guards/roles.guard");
const challenge_model_1 = require("../../models/challenge.model");
const user_model_1 = require("../../models/user.model");
const user_service_1 = require("../user/user.service");
const challenge_service_1 = require("./challenge.service");
const input_dto_1 = require("./dto/input.dto");
const response_dto_1 = require("./dto/response.dto");
let ChallengeResolver = class ChallengeResolver {
    constructor(service, userService) {
        this.service = service;
        this.userService = userService;
    }
    async createChallenge(params, teacher) {
        const data = await this.service.createChallenge(params, teacher);
        return data;
    }
    async getChallenges(params, user) {
        return await this.service.getChallenges({
            page: params.page,
            limit: params.limit,
            user,
        });
    }
    async studentSubmitAssignment(params, student) {
        await this.service.studentSubmitAssignment(params, student);
        return true;
    }
    async teacherReviewingChallenge(params, teacher) {
        await this.service.teacherReviewingChallenge(params, teacher);
        return true;
    }
    async student(challenge) {
        const { student } = challenge;
        return await this.userService.userFindOne(student);
    }
    async reviewer(challenge) {
        const { reviewer } = challenge;
        return await this.userService.userFindOne(reviewer);
    }
    async createdBy(challenge) {
        const { createdBy } = challenge;
        return await this.userService.userFindOne(createdBy);
    }
};
__decorate([
    common_1.UseGuards(roles_guard_1.RolesGuard),
    role_decorator_1.Roles(types_1.Role.Teacher),
    graphql_1.Mutation(() => challenge_model_1.Challenge),
    __param(0, graphql_1.Args('params')),
    __param(1, user_decorator_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_dto_1.CreateChallengeInput,
        user_model_1.User]),
    __metadata("design:returntype", Promise)
], ChallengeResolver.prototype, "createChallenge", null);
__decorate([
    graphql_1.Query(() => response_dto_1.GetChallengeResponse),
    __param(0, graphql_1.Args('params')),
    __param(1, user_decorator_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.PaginationInput,
        user_model_1.User]),
    __metadata("design:returntype", Promise)
], ChallengeResolver.prototype, "getChallenges", null);
__decorate([
    common_1.UseGuards(roles_guard_1.RolesGuard),
    role_decorator_1.Roles(types_1.Role.Student),
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('params')),
    __param(1, user_decorator_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_dto_1.StudentSubmitAssignmentInput,
        user_model_1.User]),
    __metadata("design:returntype", Promise)
], ChallengeResolver.prototype, "studentSubmitAssignment", null);
__decorate([
    common_1.UseGuards(roles_guard_1.RolesGuard),
    role_decorator_1.Roles(types_1.Role.Teacher),
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('params')),
    __param(1, user_decorator_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_dto_1.TeacherReviewingChallengeInput,
        user_model_1.User]),
    __metadata("design:returntype", Promise)
], ChallengeResolver.prototype, "teacherReviewingChallenge", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [challenge_model_1.Challenge]),
    __metadata("design:returntype", Promise)
], ChallengeResolver.prototype, "student", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [challenge_model_1.Challenge]),
    __metadata("design:returntype", Promise)
], ChallengeResolver.prototype, "reviewer", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [challenge_model_1.Challenge]),
    __metadata("design:returntype", Promise)
], ChallengeResolver.prototype, "createdBy", null);
ChallengeResolver = __decorate([
    graphql_1.Resolver(challenge_model_1.Challenge),
    __metadata("design:paramtypes", [challenge_service_1.ChallengeService,
        user_service_1.UserService])
], ChallengeResolver);
exports.ChallengeResolver = ChallengeResolver;
//# sourceMappingURL=challenge.resolver.js.map
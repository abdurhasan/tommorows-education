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
exports.UserResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../../common/types");
const role_decorator_1 = require("../../decorator/role.decorator");
const user_decorator_1 = require("../../decorator/user.decorator");
const roles_guard_1 = require("../../guards/roles.guard");
const user_model_1 = require("../../models/user.model");
const update_user_input_1 = require("./dto/update-user.input");
const user_personal_dto_1 = require("./dto/user-personal.dto");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    constructor(service) {
        this.service = service;
    }
    currentUser(user) {
        return user;
    }
    async updateUserRole(params) {
        try {
            if (params.role === types_1.Role.Admin) {
                throw new Error('can not assign to admin role');
            }
            await this.service.updateUserRole(params);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async getListUsers() {
        try {
            return await this.service.getListUsers();
        }
        catch (error) {
            throw error;
        }
    }
};
__decorate([
    graphql_1.Query(() => user_personal_dto_1.UserPersonal),
    __param(0, user_decorator_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "currentUser", null);
__decorate([
    common_1.UseGuards(roles_guard_1.RolesGuard),
    role_decorator_1.Roles(types_1.Role.Admin),
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('params')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUserRole", null);
__decorate([
    graphql_1.Query(() => [user_model_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getListUsers", null);
UserResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map
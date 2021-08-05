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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_model_1 = require("../../models/user.model");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
const types_1 = require("../../common/types");
let UserService = class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    async updateUserRole(params) {
        await this.repository.update({
            _id: new mongodb_1.ObjectId(params.userId),
        }, { role: params.role });
    }
    async getListUsers() {
        return await this.repository.find({ where: { role: { $ne: types_1.Role.Admin } } });
    }
    async userFindOne(uniqueId) {
        const filter = mongodb_1.ObjectId.isValid(uniqueId)
            ? { _id: new mongodb_1.ObjectId(uniqueId) }
            : { username: uniqueId };
        return await this.repository.findOne({
            where: filter,
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_model_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
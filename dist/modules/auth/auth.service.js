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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_model_1 = require("../../models/user.model");
const typeorm_2 = require("typeorm");
const isEmpty = require("is-empty");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const constants_1 = require("../../common/constants");
let AuthService = class AuthService {
    constructor(repository, jwtService) {
        this.repository = repository;
        this.jwtService = jwtService;
    }
    async login(params) {
        const validatedUser = await this.verifyByCredential(params.username, params.password);
        return await this.jwtService.signAsync({ _id: validatedUser._id });
    }
    async register(params) {
        const userExist = await this.repository.findOne({
            username: params.username,
        });
        try {
            if (!isEmpty(userExist)) {
                throw new Error(`${params.username} already registered!`);
            }
            const createdUser = new user_model_1.User(Object.assign({}, params));
            await this.repository.save(createdUser);
            return await this.jwtService.signAsync({ _id: createdUser._id });
        }
        catch (error) {
            throw error;
        }
    }
    async verifyByCredential(username, password) {
        try {
            const user = await this.repository.findOne({ username });
            if (isEmpty(user)) {
                throw new Error(constants_1.INVALID_CREDENTIAL);
            }
            const doesPasswordMatch = user
                ? await bcrypt.compare(password, user.password)
                : false;
            if (!doesPasswordMatch) {
                throw new Error(constants_1.INVALID_CREDENTIAL);
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async verifyByToken(token) {
        try {
            const validate = await this.jwtService.verifyAsync(token);
            const user = await this.repository.findOne(validate._id);
            if (isEmpty(user)) {
                throw new Error(constants_1.INVALID_CREDENTIAL);
            }
            return user;
        }
        catch (err) {
            throw err;
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_model_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
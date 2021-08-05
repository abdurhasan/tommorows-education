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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const local_guard_1 = require("../../guards/local.guard");
const auth_service_1 = require("./auth.service");
const login_input_1 = require("./dto/login.input");
const register_input_1 = require("./dto/register.input");
let AuthResolver = class AuthResolver {
    constructor(service) {
        this.service = service;
    }
    async login(params) {
        return await this.service.login(params);
    }
    async register(params) {
        return await this.service.register(params);
    }
};
__decorate([
    local_guard_1.Public(),
    graphql_1.Mutation(() => String),
    __param(0, graphql_1.Args('params')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    local_guard_1.Public(),
    graphql_1.Mutation(() => String),
    __param(0, graphql_1.Args('params')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_input_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
AuthResolver = __decorate([
    graphql_1.Resolver('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map
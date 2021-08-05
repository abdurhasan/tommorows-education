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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalGuard = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("../modules/auth/auth.service");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => common_1.SetMetadata(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
let LocalGuard = class LocalGuard {
    constructor(reflector, service) {
        this.reflector = reflector;
        this.service = service;
    }
    async canActivate(context) {
        var _a;
        const isPublic = this.reflector.getAllAndOverride(exports.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const req = (context === null || context === void 0 ? void 0 : context.switchToHttp().getRequest()) ||
            graphql_1.GqlExecutionContext.create(context).getContext().req;
        if (!((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization)) {
            throw new Error('You must provide token');
        }
        req.user = await this.service.verifyByToken(req.headers.authorization);
        return true;
    }
};
LocalGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector,
        auth_service_1.AuthService])
], LocalGuard);
exports.LocalGuard = LocalGuard;
//# sourceMappingURL=local.guard.js.map
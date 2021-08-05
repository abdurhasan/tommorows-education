"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const challenge_model_1 = require("../../models/challenge.model");
const user_model_1 = require("../../models/user.model");
const user_module_1 = require("../user/user.module");
const challenge_resolver_1 = require("./challenge.resolver");
const challenge_service_1 = require("./challenge.service");
let ChallengeModule = class ChallengeModule {
};
ChallengeModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([challenge_model_1.Challenge, user_model_1.User]), user_module_1.UserModule],
        providers: [challenge_service_1.ChallengeService, challenge_resolver_1.ChallengeResolver],
    })
], ChallengeModule);
exports.ChallengeModule = ChallengeModule;
//# sourceMappingURL=challenge.module.js.map
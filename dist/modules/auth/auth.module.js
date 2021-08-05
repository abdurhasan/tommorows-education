"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const auth_resolver_1 = require("./auth.resolver");
const config_module_1 = require("../config/config.module");
const config_service_1 = require("../config/config.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_model_1 = require("../../models/user.model");
const constants_1 = require("../../common/constants");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            config_module_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([user_model_1.User]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.JWT_SECRET_KEY,
                    signOptions: { expiresIn: constants_1.DEFAULT_TOKEN_EXPIRED },
                }),
                inject: [config_service_1.ConfigService],
            }),
        ],
        providers: [auth_service_1.AuthService, auth_resolver_1.AuthResolver],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map
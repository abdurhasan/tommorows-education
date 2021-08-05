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
exports.UserPersonal = void 0;
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../../../common/types");
const user_model_1 = require("../../../models/user.model");
let UserPersonal = class UserPersonal extends user_model_1.User {
};
__decorate([
    graphql_1.Field(() => types_1.Role),
    __metadata("design:type", String)
], UserPersonal.prototype, "role", void 0);
UserPersonal = __decorate([
    graphql_1.ObjectType()
], UserPersonal);
exports.UserPersonal = UserPersonal;
//# sourceMappingURL=user-personal.dto.js.map
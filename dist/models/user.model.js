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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../common/types");
const constants_1 = require("../common/constants");
let User = class User {
    constructor(params) {
        Object.assign(this, params);
    }
    async b4register() {
        this.password = await bcrypt.hash(this.password, constants_1.SALT_ROUNDS);
        this.role = types_1.Role.Student;
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", typeorm_1.ObjectID)
], User.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.HideField(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.HideField(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "b4register", null);
User = __decorate([
    typeorm_1.Entity('User'),
    graphql_1.ObjectType(),
    __metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map
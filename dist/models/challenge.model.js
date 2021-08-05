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
exports.Challenge = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("./user.model");
let Challenge = class Challenge {
    constructor(params) {
        Object.assign(this, params);
    }
    b4create() {
        this.solution = '';
        this.grade = 0;
        this.comment = '';
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", typeorm_1.ObjectID)
], Challenge.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => user_model_1.User, { description: 'user whom assigned by challenge' }),
    __metadata("design:type", String)
], Challenge.prototype, "student", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => user_model_1.User, {
        nullable: true,
        description: 'teacher who is currently reviewing the assignment',
    }),
    __metadata("design:type", String)
], Challenge.prototype, "reviewer", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Challenge.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => String, {
        nullable: true,
        description: 'Solution that answered from student',
    }),
    __metadata("design:type", String)
], Challenge.prototype, "solution", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => graphql_1.Float, { nullable: true, description: 'Score rated by teacher' }),
    __metadata("design:type", Number)
], Challenge.prototype, "grade", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => String, {
        nullable: true,
        description: 'Feedback from teacher for the student',
    }),
    __metadata("design:type", String)
], Challenge.prototype, "comment", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => user_model_1.User, {
        nullable: true,
        description: 'teacher who is created the assignment',
    }),
    __metadata("design:type", String)
], Challenge.prototype, "createdBy", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], Challenge.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Challenge.prototype, "b4create", null);
Challenge = __decorate([
    typeorm_1.Entity('Challenge'),
    graphql_1.ObjectType(),
    __metadata("design:paramtypes", [Object])
], Challenge);
exports.Challenge = Challenge;
//# sourceMappingURL=challenge.model.js.map
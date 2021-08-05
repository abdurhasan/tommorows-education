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
exports.TeacherReviewingChallengeInput = exports.StudentSubmitAssignmentInput = exports.CreateChallengeInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateChallengeInput = class CreateChallengeInput {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateChallengeInput.prototype, "student", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateChallengeInput.prototype, "description", void 0);
CreateChallengeInput = __decorate([
    graphql_1.InputType()
], CreateChallengeInput);
exports.CreateChallengeInput = CreateChallengeInput;
let StudentSubmitAssignmentInput = class StudentSubmitAssignmentInput {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], StudentSubmitAssignmentInput.prototype, "challengeId", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], StudentSubmitAssignmentInput.prototype, "solution", void 0);
StudentSubmitAssignmentInput = __decorate([
    graphql_1.InputType()
], StudentSubmitAssignmentInput);
exports.StudentSubmitAssignmentInput = StudentSubmitAssignmentInput;
let TeacherReviewingChallengeInput = class TeacherReviewingChallengeInput {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], TeacherReviewingChallengeInput.prototype, "challengeId", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], TeacherReviewingChallengeInput.prototype, "comment", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], TeacherReviewingChallengeInput.prototype, "grade", void 0);
TeacherReviewingChallengeInput = __decorate([
    graphql_1.InputType()
], TeacherReviewingChallengeInput);
exports.TeacherReviewingChallengeInput = TeacherReviewingChallengeInput;
//# sourceMappingURL=input.dto.js.map
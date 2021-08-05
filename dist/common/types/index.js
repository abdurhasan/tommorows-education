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
exports.PaginationResponse = exports.PaginationInput = exports.Role = void 0;
const graphql_1 = require("@nestjs/graphql");
var Role;
(function (Role) {
    Role["Admin"] = "Admin";
    Role["Teacher"] = "Teacher";
    Role["Student"] = "Student";
})(Role = exports.Role || (exports.Role = {}));
graphql_1.registerEnumType(Role, {
    name: 'Role',
    description: 'user roles enum',
});
let PaginationInput = class PaginationInput {
};
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginationInput.prototype, "page", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginationInput.prototype, "limit", void 0);
PaginationInput = __decorate([
    graphql_1.InputType()
], PaginationInput);
exports.PaginationInput = PaginationInput;
let PaginationResponse = class PaginationResponse {
};
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginationResponse.prototype, "totalPage", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginationResponse.prototype, "totalData", void 0);
PaginationResponse = __decorate([
    graphql_1.ObjectType()
], PaginationResponse);
exports.PaginationResponse = PaginationResponse;
//# sourceMappingURL=index.js.map
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
exports.RegisterInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const login_input_1 = require("./login.input");
let RegisterInput = class RegisterInput extends login_input_1.LoginInput {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "fullname", void 0);
RegisterInput = __decorate([
    graphql_1.InputType()
], RegisterInput);
exports.RegisterInput = RegisterInput;
//# sourceMappingURL=register.input.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("../common/types");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => common_1.SetMetadata(exports.ROLES_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=role.decorator.js.map
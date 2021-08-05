"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const env_var_1 = require("env-var");
const dotenv_1 = require("dotenv");
dotenv_1.config({ path: '.env' });
class ConfigService {
    constructor() {
        this.env = env_var_1.from(process.env);
        this.NODE_ENV = this.env.get('NODE_ENV').required().asString();
        this.PORT = process.env.PORT || 3000;
        this.DATABASE_URL = this.env
            .get('DATABASE_URL')
            .required()
            .asString();
        this.JWT_SECRET_KEY = this.env
            .get('JWT_SECRET_KEY')
            .required()
            .asString();
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map
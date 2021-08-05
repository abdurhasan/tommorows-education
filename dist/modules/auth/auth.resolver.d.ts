import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
export declare class AuthResolver {
    private readonly service;
    constructor(service: AuthService);
    login(params: LoginInput): Promise<string>;
    register(params: RegisterInput): Promise<string>;
}

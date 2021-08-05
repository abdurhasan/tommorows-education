import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { RegisterInput } from './dto/register.input';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
export declare class AuthService {
    private repository;
    private readonly jwtService;
    constructor(repository: Repository<User>, jwtService: JwtService);
    login(params: LoginInput): Promise<string>;
    register(params: RegisterInput): Promise<string>;
    verifyByCredential(username: string, password: string): Promise<User>;
    verifyByToken(token: string): Promise<User>;
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { RegisterInput } from './dto/register.input';
import * as isEmpty from 'is-empty';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { INVALID_CREDENTIAL } from 'src/common/constants';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(params: LoginInput): Promise<string> {
    const validatedUser = await this.verifyByCredential(
      params.username,
      params.password,
    );
    return await this.jwtService.signAsync({ _id: validatedUser._id });
  }

  async register(params: RegisterInput): Promise<string> {
    const userExist = await this.repository.findOne({
      username: params.username,
    });
    try {
      if (!isEmpty(userExist)) {
        throw new Error(`${params.username} already registered!`);
      }

      const createdUser = new User({ ...params });

      await this.repository.save(createdUser);

      return await this.jwtService.signAsync({ _id: createdUser._id });
    } catch (error) {
      throw error;
    }
  }

  async verifyByCredential(username: string, password: string): Promise<User> {
    try {
      const user = await this.repository.findOne({ username });

      if (isEmpty(user)) {
        throw new Error(INVALID_CREDENTIAL);
      }

      const doesPasswordMatch: boolean = user
        ? await bcrypt.compare(password, user.password)
        : false;

      if (!doesPasswordMatch) {
        throw new Error(INVALID_CREDENTIAL);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async verifyByToken(token: string): Promise<User> {
    try {
      const validate = await this.jwtService.verifyAsync(token);
      const user = await this.repository.findOne(validate._id);
      if (isEmpty(user)) {
        throw new Error(INVALID_CREDENTIAL);
      }

      return user;
    } catch (err) {
      throw err;
    }
  }
}

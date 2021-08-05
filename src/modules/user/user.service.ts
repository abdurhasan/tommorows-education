import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { ObjectId } from 'mongodb';
import { Role } from 'src/common/types';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async updateUserRole(params: UpdateUserInput) {
    await this.repository.update(
      {
        _id: new ObjectId(params._id),
      },
      { role: params.role },
    );
  }

  async getListUsers() {
    return await this.repository.find({ where: { role: { $ne: Role.Admin } } });
  }

  async userFindOne(uniqueId: string) {
    const filter = ObjectId.isValid(uniqueId)
      ? { _id: new ObjectId(uniqueId) }
      : { username: uniqueId };

    return await this.repository.findOne({
      where: filter,
    });
  }
}

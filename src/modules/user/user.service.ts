import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models/user.model";
import { Repository } from "typeorm";
import { UpdateUserInput } from "./dto/input.dto";
import { ObjectId } from "mongodb";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async updateUserRole(params: UpdateUserInput) {
    await this.repository.update(
      {
        _id: new ObjectId(params._id),
      },
      { role: params.role }
    );
  }
}

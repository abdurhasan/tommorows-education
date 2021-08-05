import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UserService {
    private repository;
    constructor(repository: Repository<User>);
    updateUserRole(params: UpdateUserInput): Promise<void>;
    getListUsers(): Promise<User[]>;
    userFindOne(uniqueId: string): Promise<User>;
}

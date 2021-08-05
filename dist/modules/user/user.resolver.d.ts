import { User } from 'src/models/user.model';
import { UpdateUserInput } from './dto/update-user.input';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly service;
    constructor(service: UserService);
    currentUser(user: any): any;
    updateUserRole(params: UpdateUserInput): Promise<boolean>;
    getListUsers(): Promise<User[]>;
}

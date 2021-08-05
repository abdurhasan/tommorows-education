import { ObjectID } from 'typeorm';
import { Role } from 'src/common/types';
export declare class User {
    constructor(params?: Partial<User>);
    _id: ObjectID;
    username: string;
    password: string;
    role: Role;
    fullname: string;
    createdAt: Date;
    b4register(): Promise<void>;
}

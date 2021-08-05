import { ObjectID } from 'typeorm';
export declare class Challenge {
    constructor(params?: Partial<Challenge>);
    _id: ObjectID;
    student: string;
    reviewer: string;
    description: string;
    solution: string;
    grade: number;
    comment: string;
    createdBy: string;
    createdAt: Date;
    b4create(): void;
}

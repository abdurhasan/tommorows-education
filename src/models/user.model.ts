import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/common/types';
import { SALT_ROUNDS } from 'src/common/constants';

@Entity('User')
@ObjectType()
export class User {
  constructor(params?: Partial<User>) {
    Object.assign(this, params);
  }
  @ObjectIdColumn()
  @Field(() => ID)
  _id: ObjectID;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  @HideField()
  password: string;

  @Column()
  @HideField()
  role: Role;

  @Column()
  @Field()
  fullname: string;

  @CreateDateColumn()
  @Field({ nullable: true })
  createdAt: Date;

  @BeforeInsert()
  async b4register() {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.role = Role.Student;
  }
}

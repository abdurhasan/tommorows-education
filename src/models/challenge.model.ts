import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@Entity('Challenge')
@ObjectType()
export class Challenge {
  constructor(params?: Partial<Challenge>) {
    Object.assign(this, params);
  }
  @ObjectIdColumn()
  @Field(() => ID)
  _id: ObjectID;

  @Column()
  @Field(() => User, { description: 'user whom assigned by challenge' })
  student: string;

  @Column()
  @Field(() => User, {
    nullable: true,
    description: 'teacher who is currently reviewing the assignment',
  })
  reviewer: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String, {
    nullable: true,
    description: 'Solution that answered from student',
  })
  solution: string;

  @Column()
  @Field(() => Float, { nullable: true, description: 'Score rated by teacher' })
  grade: number;

  @Column()
  @Field(() => String, {
    nullable: true,
    description: 'Feedback from teacher for the student',
  })
  comment: string;

  @Column()
  @Field(() => User, {
    nullable: true,
    description: 'teacher who is created the assignment',
  })
  createdBy: string;

  @CreateDateColumn()
  @Field({ nullable: true })
  createdAt: Date;

  @BeforeInsert()
  b4create() {
    this.solution = '';
    this.grade = 0;
    this.comment = '';
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from 'src/models/challenge.model';
import { User } from 'src/models/user.model';
import { UserModule } from '../user/user.module';
import { ChallengeResolver } from './challenge.resolver';
import { ChallengeService } from './challenge.service';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, User]), UserModule],
  providers: [ChallengeService, ChallengeResolver],
})
export class ChallengeModule {}

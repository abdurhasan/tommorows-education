import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { LocalGuard } from './guards/local.guard';
import { AuthModule } from './modules/auth/auth.module';
import { ChallengeModule } from './modules/challenge/challenge.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
    }),
    AuthModule,
    UserModule,
    ChallengeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: LocalGuard,
    },
  ],
})
export class AppModule {}

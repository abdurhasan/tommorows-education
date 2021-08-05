import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        url: config.DATABASE_URL,
        useNewUrlParser: true,
        entities: [
          __dirname + '/../../models/**/*{.ts,.js}',
          __dirname + '/../../**/*.model{.ts,.js}',
        ],
        synchronize: false,
        useUnifiedTopology: true,
      }),
    }),
  ],
})
export class DatabaseModule {}

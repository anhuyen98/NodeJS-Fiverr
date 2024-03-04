import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { CommentsModule } from './comments/comments.module';
import { DetailJobModule } from './detail-job/detail-job.module';
import { HireJobModule } from './hire-job/hire-job.module';
import { JobTypeModule } from './job-type/job-type.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    JobModule,
    CommentsModule,
    DetailJobModule,
    HireJobModule,
    JobTypeModule,
    SkillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

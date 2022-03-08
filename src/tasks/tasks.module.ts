import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule,
    PassportModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
  
})
export class TasksModule {}

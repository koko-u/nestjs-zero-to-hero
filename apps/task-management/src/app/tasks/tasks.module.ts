import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { StatusPipe } from './pipes/status.pipe'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskRepository } from './repositories/task.repository'

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TasksController],
  providers: [TasksService, StatusPipe],
})
export class TasksModule {}

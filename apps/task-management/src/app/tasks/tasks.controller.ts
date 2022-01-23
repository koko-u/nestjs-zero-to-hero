import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { ITask } from './models/task.model'
import { CreateTaskDto } from './dtos/create-task.dto'
import { StatusPipe } from './pipes/status.pipe'
import { TaskStatus } from './models/task-statks.model'
import { FilterTaskDto } from './dtos/filter-task.dto'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getFilteredTasks(@Query() filter: FilterTaskDto): Promise<ITask[]> {
    return this.tasksService.getFilteredTasks(filter)
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<ITask> {
    const task = await this.tasksService.getTaskById(id)
    if (!task) {
      throw new NotFoundException(id)
    }
    return task
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<ITask> {
    return this.tasksService.createTask(createTaskDto)
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status', StatusPipe) status: TaskStatus
  ): Promise<ITask> {
    const task = await this.tasksService.updateTaskStatus(id, status)
    if (!task) throw new NotFoundException(id)
    return task
  }

  @Delete(':id')
  async deleteTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.tasksService.deleteTaskById(id)
  }
}

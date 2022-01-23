import { Injectable } from '@nestjs/common'
import { ITask } from './models/task.model'
import { TaskRepository } from './repositories/task.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './entities/task.entity'
import { CreateTaskDto } from './dtos/create-task.dto'
import { TaskStatus } from './models/task-statks.model'
import { FilterTaskDto } from './dtos/filter-task.dto'

const partialMatch = (search: string) => {
  return (task: ITask) => {
    const title = task.title.toLowerCase()
    const description = task.description.toLowerCase()
    return (
      title.includes(search.toLowerCase()) ||
      description.includes(search.toLowerCase())
    )
  }
}

const plain = (entity: Task): ITask => {
  return {
    id: entity.id ?? '',
    title: entity.title ?? '',
    description: entity.description ?? '',
    status: entity.status ?? 'Open',
  }
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository
  ) {}

  // async getAllTasks(): Promise<ITask[]> {
  //   return this._tasks.map((task) => ({ ...task }))
  // }
  //
  async getFilteredTasks(filter: FilterTaskDto): Promise<ITask[]> {
    const { search, status } = filter
    const tasks = await this.taskRepository.selectBySearchTermAndStatus(
      search,
      status
    )
    return tasks.map(plain)
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
    const task = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
    })
    const created = await this.taskRepository.save(task)
    return plain(created)
  }

  async getTaskById(id: string): Promise<ITask | undefined> {
    const task = await this.taskRepository.findOne(id)
    if (task) {
      return plain(task)
    } else {
      return undefined
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus
  ): Promise<ITask | undefined> {
    await this.taskRepository.update(id, { status })
    return this.getTaskById(id)
  }

  async deleteTaskById(id: string): Promise<void> {
    await this.taskRepository.delete(id)
  }
}

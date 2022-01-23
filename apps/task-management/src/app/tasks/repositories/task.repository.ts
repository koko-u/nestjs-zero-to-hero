import { Brackets, EntityRepository, Like, Repository } from 'typeorm'
import { Task } from '../entities/task.entity'
import { TaskStatus } from '../models/task-statks.model'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async selectBySearchTermAndStatus(
    search?: string,
    status?: TaskStatus
  ): Promise<Task[]> {
    const builder = this.createQueryBuilder('task')
    const searchBraket = new Brackets((qb) => {
      qb.where('task.title LIKE :task', { task: `%${search}%` }).orWhere(
        'task.description LIKE :description',
        { description: `%${search}%` }
      )
    })

    const statusBracket = new Brackets((qb) =>
      qb.where('task.status = :status', { status })
    )
    if (search && status) {
      return builder.where(searchBraket).andWhere(statusBracket).getMany()
    }
    if (search) {
      return builder.where(searchBraket).getMany()
    }
    if (status) {
      return builder.where(statusBracket).getMany()
    }
    return this.find()
  }
}

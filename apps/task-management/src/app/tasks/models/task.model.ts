import { TaskStatus } from './task-statks.model'

export interface ITask {
  id: string
  title: string
  description: string
  status: TaskStatus
}

import { TaskStatus, TaskStatuses } from '../models/task-statks.model'
import { IsIn, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator'

export class FilterTaskDto {
  @IsOptional()
  @IsIn(TaskStatuses)
  status?: TaskStatus

  @ValidateIf((value: FilterTaskDto) => value.search != undefined)
  @IsNotEmpty()
  search?: string

  isEmpty(): boolean {
    return !this.status && !this.search
  }
}

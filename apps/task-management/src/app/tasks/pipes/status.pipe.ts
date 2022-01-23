import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { TaskStatuses } from '../models/task-statks.model'

@Injectable()
export class StatusPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    for (const status of TaskStatuses) {
      if (value === status) return value
    }
    throw new BadRequestException(`${value} is not a valid Status value.`)
  }
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { TaskStatus } from '../models/task-statks.model'

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined

  @Column('varchar', { length: 100, nullable: false })
  title: string | undefined

  @Column('varchar', { length: 255, nullable: true })
  description: string | undefined

  @Column('varchar', { length: 10, nullable: false, default: 'Open' })
  status: TaskStatus = 'Open'
}

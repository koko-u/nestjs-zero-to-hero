import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  constructor(title?: string, description?: string) {
    this.title = title ?? ''
    this.description = description ?? ''
  }
}

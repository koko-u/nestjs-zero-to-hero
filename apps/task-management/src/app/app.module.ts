import { Module } from '@nestjs/common'
import { TasksModule } from './tasks/tasks.module'
import { TypeOrmModule } from '@nestjs/typeorm'

const port = Number(process.env.DB_PORT)

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: port,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_INSTANCE,
      autoLoadEntities: true,
      synchronize: true,
      logging: ['query', 'error'],
    }),
  ],
})
export class AppModule {}

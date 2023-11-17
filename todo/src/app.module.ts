import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    MongooseModule.forRoot(process.env.ME_CONFIG_MONGODB_URL),
    ApiModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

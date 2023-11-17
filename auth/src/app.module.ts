import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    MongooseModule.forRoot(process.env.ME_CONFIG_MONGODB_URL),
    ApiModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

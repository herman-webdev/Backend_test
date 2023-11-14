import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/database/user.schema';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { UserService } from 'src/user/user.service';
import { JwtTokenHelper } from './helpers/token.helper';
import { PasswordHashHelper } from './helpers/hash.helper';
import { PasswordHashCompareHelper } from './helpers/hash-compare.helper';
import { JwtApiGuard } from './strategies/canAcivate.service';
import { LocalStrategyService } from './strategies/local-strategy.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    HttpModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({ secret: process.env.SECRET_KEY }),
  ],
  controllers: [ApiController],
  providers: [
    ApiService,
    HttpModule,
    UserService,
    JwtTokenHelper,
    PasswordHashHelper,
    PasswordHashCompareHelper,
    JwtApiGuard,
    LocalStrategyService,
  ],
  exports: [
    ApiService,
    HttpModule,
    UserService,
    JwtTokenHelper,
    PasswordHashHelper,
    PasswordHashCompareHelper,
    JwtApiGuard,
    LocalStrategyService,
  ],
})
export class ApiModule {}

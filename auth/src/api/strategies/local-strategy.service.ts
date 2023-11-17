import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ApiService } from '../api.service';
import { Types } from 'mongoose';

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy, 'local') {
  constructor(private apiService: ApiService) {
    super({ usernameField: 'id' });
  }

  async validate(id: Types.ObjectId): Promise<boolean | HttpException> {
    try {
      const user = await this.apiService.validateUser(id);
      if (!user) {
        throw new HttpException(
          'Invalid credentials...',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw error;
      }
    }
  }
}

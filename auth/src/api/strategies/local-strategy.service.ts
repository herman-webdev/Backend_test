import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ApiService } from '../api.service';
import { Types } from 'mongoose';

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy, 'local') {
  constructor(private apiService: ApiService) {
    super({ usernameField: 'id' });
  }

  async validate(id: Types.ObjectId): Promise<any> {
    try {
      const user = await this.apiService.validateUser(id);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials...');
      }

      return user;
    } catch (error) {
      throw new HttpException('Bad id or password...', HttpStatus.UNAUTHORIZED);
    }
  }
}

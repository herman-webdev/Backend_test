import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';
import { JwtTokenHelper } from './helpers/token.helper';
import { ApiSigninResponse, ApiSignupResponse } from 'src/utils/types';
import { Types } from 'mongoose';
import { SigninDto } from './dto/signin.dto';
import { PasswordHashHelper } from './helpers/hash.helper';
import { PasswordHashCompareHelper } from './helpers/hash-compare.helper';

@Injectable()
export class ApiService {
  constructor(private readonly userService: UserService) {}

  async signun({ password }: SignupDto): Promise<ApiSignupResponse> {
    try {
      const hash = await PasswordHashHelper.generateHash(password);
      const candidate = await this.userService.createUser(hash);
      const token = JwtTokenHelper.generate(candidate._id);

      return {
        id: candidate._id,
        token: token,
      };
    } catch (error) {
      throw new HttpException(
        'Something went wrong...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async signin(signinOptions: SigninDto): Promise<ApiSigninResponse> {
    try {
      if (!signinOptions.id || !signinOptions.password) {
        throw new HttpException('Bad id or password', HttpStatus.UNAUTHORIZED);
      }

      const candidate = await this.userService.findUserbyId(signinOptions.id);
      if (!candidate) {
        throw new HttpException('Bad id or password', HttpStatus.UNAUTHORIZED);
      }

      const checkPassword = await PasswordHashCompareHelper.makeCompare(
        signinOptions.password,
        candidate.password,
      );
      if (!checkPassword) {
        throw new HttpException('Bad id or password', HttpStatus.UNAUTHORIZED);
      }

      const token = JwtTokenHelper.generate(candidate._id);

      return {
        token: token,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw error;
      }
    }
  }

  async validateUser(id: Types.ObjectId): Promise<boolean> {
    const user = await this.userService.findUserbyId(id);
    if (!user) {
      throw new NotFoundException();
    }

    return true;
  }
}

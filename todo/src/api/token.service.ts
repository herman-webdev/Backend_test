import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Types } from 'mongoose';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ApiTokenService {
  constructor(private readonly httpService: HttpService) {}

  async sendBearerToken(token: string): Promise<Types.ObjectId> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get<Types.ObjectId>('http://localhost:5000/auth/user', {
            headers: {
              Authorization: token,
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
            }),
          ),
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Something went wrong...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

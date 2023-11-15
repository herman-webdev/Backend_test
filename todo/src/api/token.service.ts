import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Types } from 'mongoose';

@Injectable()
export class ApiTokenService {
  constructor() {}

  getBearerToken(authorizationHeader: string): string {
    if (!authorizationHeader)
      throw new HttpException('Bad token', HttpStatus.UNAUTHORIZED);
    if (typeof authorizationHeader !== 'string')
      throw new HttpException('Bad token', HttpStatus.FORBIDDEN);

    const token = authorizationHeader.replace('Bearer ', '');
    return token;
  }

  async sendBearerToken(token: string): Promise<Types.ObjectId> {
    try {
      const response = await axios.get('http://localhost:5000/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return await response.data;
    } catch (error) {
      throw new HttpException(
        'Something went wrong...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

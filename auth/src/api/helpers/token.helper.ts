import * as jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export class JwtTokenHelper {
  static generate(userId: Types.ObjectId): string {
    const token = jwt.sign({ sub: userId }, process.env.SECRET_KEY, {
      expiresIn: '24h',
    });
    return token;
  }
}

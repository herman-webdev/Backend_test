import { Types } from 'mongoose';

export class SigninDto {
  id: Types.ObjectId;
  password: string;
}

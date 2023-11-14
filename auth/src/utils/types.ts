import { Types } from 'mongoose';

export interface ApiSignupResponse {
  id: Types.ObjectId;
  token: string;
}

export interface ApiSigninResponse {
  token: string;
}

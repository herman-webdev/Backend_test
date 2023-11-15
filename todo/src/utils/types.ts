import { Types } from 'mongoose';

export interface ApiCreateResponse {
  id: Types.ObjectId;
}

export interface ApiGetResponse {
  id: Types.ObjectId;
  title: string;
  description: string;
}

export interface ApiDeleteResponse {
  id: Types.ObjectId;
}

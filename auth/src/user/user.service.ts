import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/database/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserbyId(id: Types.ObjectId): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  async createUser(password: string): Promise<UserDocument> {
    const user = await this.userModel.create({ password: password });

    return user.save();
  }
}

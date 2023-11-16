import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { SignupDto } from './dto/signup.dto';
import { Response } from 'express';
import { SigninDto } from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtApiGuard } from './strategies/canAcivate.service';

@Controller('auth')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('signup')
  async signup(
    @Body() dto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const record = await this.apiService.signun(dto);
      return record;
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signin(
    @Body() dto: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = await this.apiService.signin(dto);
      return user;
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @UseGuards(JwtApiGuard)
  @Get('user')
  async getUser(@Req() request: any) {
    return {
      id: request.user.sub,
    };
  }
}

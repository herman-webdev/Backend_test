import { Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateTodoDto } from './dto/createTodo.dto';
import { Request, Response } from 'express';
import { ApiTokenService } from './token.service';
import { DeleteTodoDto } from './dto/deleteTodo.dto';

@Controller('todo')
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private apiTokenService: ApiTokenService,
  ) {}

  @Post('create')
  async create(
    @Body() dto: CreateTodoDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const bearerToken = this.apiTokenService.getBearerToken(
        req.headers.authorization,
      );
      const ownerId = await this.apiTokenService.sendBearerToken(bearerToken);

      const record = await this.apiService.create(ownerId, dto);
      return record;
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Get('get')
  async get(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const bearerToken = this.apiTokenService.getBearerToken(
        req.headers.authorization,
      );
      const ownerId = await this.apiTokenService.sendBearerToken(bearerToken);

      return await this.apiService.get(ownerId);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Delete('delete')
  async delete(
    @Body() dto: DeleteTodoDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const bearerToken = this.apiTokenService.getBearerToken(
        req.headers.authorization,
      );
      const ownerId = await this.apiTokenService.sendBearerToken(bearerToken);

      return await this.apiService.delete(ownerId, dto);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

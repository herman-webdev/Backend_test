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
    const ownerId = await this.apiTokenService.sendBearerToken(
      req.headers.authorization,
    );
    const record = await this.apiService.create(ownerId, dto);
    res.status(200);

    return record;
  }

  @Get('get')
  async get(@Req() req: Request) {
    const ownerId = await this.apiTokenService.sendBearerToken(
      req.headers.authorization,
    );

    return await this.apiService.get(ownerId);
  }

  @Delete('delete')
  async delete(@Body() dto: DeleteTodoDto, @Req() req: Request) {
    const ownerId = await this.apiTokenService.sendBearerToken(
      req.headers.authorization,
    );

    return await this.apiService.delete(ownerId, dto);
  }
}

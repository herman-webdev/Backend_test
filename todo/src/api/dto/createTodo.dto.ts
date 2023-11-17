import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: 'Title must include only letters or numbers...' })
  @MinLength(1, { message: 'Password must be at least 1 character...' })
  @MaxLength(255, {
    message: 'Title can not be more than 255 characters...',
  })
  title: string;

  @IsString({ message: 'Title must include only letters or numbers...' })
  @MinLength(1, { message: 'Password must be at least 1 character...' })
  @MaxLength(1255, {
    message: 'Description can not be more than 1255 characters...',
  })
  description: string;
}

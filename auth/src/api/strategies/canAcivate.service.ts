import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtApiGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Bad token');
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new HttpException('Token has expired', HttpStatus.FORBIDDEN);
      } else if (error.name === 'JsonWebTokenError') {
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      } else {
        throw new HttpException('Bad token', HttpStatus.FORBIDDEN);
      }
    }
  }
}

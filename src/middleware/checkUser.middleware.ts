// import { Injectable } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// @Injectable()
// export class checkUser implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log(req.headers);
//     next();
//   }
// }
@Injectable()
export class CheckUser implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const reqUser = req?.user?.used_id;
    const reqRole = req?.user?.role;
    const reqParams = Number(req?.params?.id);
    if (reqUser === reqParams || reqRole === 'Quản trị viên') {
      return true;
    }
    throw new UnauthorizedException('Không có quyền truy cập');
  }
}

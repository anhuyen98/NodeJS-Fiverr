import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user, body, params } = context.switchToHttp().getRequest();
    if (
      user?.used_id === Number(body?.user_id) ||
      user?.used_id === Number(params?.userID)
    ) {
      return true;
    }
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}

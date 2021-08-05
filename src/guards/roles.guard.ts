import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/types';
import { ROLES_KEY } from 'src/decorator/role.decorator';
import { User } from 'src/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const { user }: { user: User } =
      context?.switchToHttp().getRequest() ||
      GqlExecutionContext.create(context).getContext().req;

    if (!requiredRoles.length || user.role.includes(Role.Admin)) {
      return true;
    }

    return requiredRoles.some((reqRole) => reqRole === user?.role);
  }
}

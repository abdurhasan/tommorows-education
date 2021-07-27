import { ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthService } from "src/modules/auth/auth.service";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class LocalGuard {
  constructor(
    private reflector: Reflector,
    private readonly service: AuthService
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const req =
      context?.switchToHttp().getRequest() ||
      GqlExecutionContext.create(context).getContext().req;

    if (!req?.headers?.authorization) {
      throw new Error("You must provide token");
    }
    req.user = await this.service.verifyByToken(req.headers.authorization);
    return true;
  }
}

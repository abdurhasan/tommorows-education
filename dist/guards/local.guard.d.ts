import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/modules/auth/auth.service';
export declare const IS_PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare class LocalGuard {
    private reflector;
    private readonly service;
    constructor(reflector: Reflector, service: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

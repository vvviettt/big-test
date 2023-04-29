/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { env } from 'src/config/env.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: env.JWT.JWT_SECRET
            });
            request['user'] = payload;
        } catch (e) {
            throw new UnauthorizedException();
        }
        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Admin } from '../admin/schema/admin.schema';

@Injectable()
export class TokenService {
    verifyToken(token: string): Admin {
        try {
            const decoded = jwt.verify(token, 'your-secret-key') as Admin;
            return decoded;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    constructor(private readonly tokenService: TokenService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Token not provided');
        }

        try {
            const admin = this.tokenService.verifyToken(token);
            req['admin'] = admin; // Set the admin object on the request object for future use
            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}

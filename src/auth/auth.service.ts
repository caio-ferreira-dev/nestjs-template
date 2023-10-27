import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from './types/token.type';
import { Payload } from './types/payload.type';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(user: any): Token {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.username,
        },
        {
          expiresIn: '1 day',
          subject: `${user.id}`,
          audience: 'user',
          issuer: 'login',
        },
      ),
    };
  }

  verifyToken(token: string): Payload {
    const data = this.jwtService.verify(token, {
      audience: 'user',
      issuer: 'login',
    });
    return data;
  }
}

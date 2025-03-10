import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenUserJwtService {
  constructor(private readonly jwtService: JwtService) {}

  // public async checkRefreshToken(refreshToken: string) {
  //   try {
  //     const data = await this.jwtService.verifyAsync(refreshToken, {
  //       secret: process.env.JWT_REFRESH_USER_SECRET,
  //     });
  //     return data;
  //   } catch (error) {
  //     throw new BadRequestException(null, 'Token inválido ou expirado.');
  //   }
  // }

  // public async createRefreshToken<T extends object>(payload: T) {
  //   return await this.jwtService.signAsync(payload, {
  //     secret: process.env.JWT_REFRESH_USER_SECRET,
  //     expiresIn: '7d',
  //   });
  // }

  public async checkSessionToken(sessionToken: string) {
    try {
      const data = await this.jwtService.verifyAsync(sessionToken, {
        secret: process.env.JWT_SECRET,
      });
      return data;
    } catch {
      throw new BadRequestException(null, 'Token inválido ou expirado.');
    }
  }

  public async createSessionToken<T extends object>(payload: T) {
    const session = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d', // 15 minutos para sessão de usuário
    });
    return session;
  }
}

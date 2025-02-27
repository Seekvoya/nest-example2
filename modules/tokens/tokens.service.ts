import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable } from '@nestjs/common';

import { UserTokenPayload } from '@/auth/types';
import { JwtAdminServiceSymbol, JwtGlobalServiceSymbol } from '@/auth/constants';

@Injectable()
export class TokensService {
  constructor(
    @Inject(JwtAdminServiceSymbol)
    private readonly adminJwtService: JwtService,
    @Inject(JwtGlobalServiceSymbol)
    private readonly globalJwtService: JwtService,
  ) {}

  public generateAccessToken(payload: UserTokenPayload) {
    return payload.isAdmin
      ? this.generateAdminAccessToken(payload)
      : this.generateUserAccessToken(payload);
  }

  //
  //
  //

  private generateAdminAccessToken(payload: UserTokenPayload) {
    return this.adminJwtService.signAsync(payload);
  }

  public verifyAdminAccessToken(token: string) {
    return this.adminJwtService.verify<UserTokenPayload>(token);
  }

  //
  //
  //

  public generateUserAccessToken(payload: UserTokenPayload) {
    return this.globalJwtService.signAsync(payload);
  }

  public verifyUserAccessToken(token: string) {
    return this.globalJwtService.verify<UserTokenPayload>(token);
  }
}

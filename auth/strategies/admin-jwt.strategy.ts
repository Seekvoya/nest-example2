import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AbstractStrategy, PassportStrategy } from '@nestjs/passport';

import EnvConfig from '@/config/envConfig';
import { JwtAccessType } from '@/auth/constants';

import { UserTokenPayload } from '@/auth/types';
import { UsersExceptions } from '@/exceptions/users';
import { getAccessToken } from '@/utils/getUserToken';
import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class AdminJwtStrategy
  extends PassportStrategy(Strategy, JwtAccessType.ADMIN)
  implements AbstractStrategy
{
  constructor(private readonly usersService: UsersService) {
    super({
      secretOrKey: EnvConfig.jwt.adminSecret,
      jwtFromRequest: getAccessToken,
    });
  }

  public async validate({ id }: UserTokenPayload) {
    try {
      const user = await this.usersService.findOneByOrError({ id });

      if (!user.isAdmin) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (err) {
      return UsersExceptions.Unauthorized();
    }
  }
}

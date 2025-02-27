import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AbstractStrategy, PassportStrategy } from '@nestjs/passport';

import { JwtAccessType } from '@/auth/constants';
import EnvConfig from '@/config/envConfig';

import { UserTokenPayload } from '@/auth/types';
import { UsersExceptions } from '@/exceptions/users';
import { UsersService } from '@/modules/users/users.service';
import { getAccessToken } from '@/utils/getUserToken';

@Injectable()
export class GlobalJwtStrategy
  extends PassportStrategy(Strategy, JwtAccessType.GLOBAL)
  implements AbstractStrategy
{
  constructor(private readonly usersService: UsersService) {
    super({
      secretOrKey: EnvConfig.jwt.userSecret,
      jwtFromRequest: getAccessToken,
    });
  }

  public async validate({ id }: UserTokenPayload) {
    try {
      return await this.usersService.findOneByOrError({ id });
    } catch (err) {
      return UsersExceptions.Unauthorized();
    }
  }
}

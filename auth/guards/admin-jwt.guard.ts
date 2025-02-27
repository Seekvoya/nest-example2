import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { JwtAccessType } from '@/auth/constants';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminJwtGuard extends AuthGuard(JwtAccessType.ADMIN) implements CanActivate {
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}

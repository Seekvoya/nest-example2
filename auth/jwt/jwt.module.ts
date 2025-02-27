import { Module } from '@nestjs/common';
import { JwtGlobalModule } from '@/auth/jwt/jwt-global.module';
import { JwtAdminModule } from '@/auth/jwt/jwt-admin.module';

@Module({
  imports: [JwtAdminModule, JwtGlobalModule],
  exports: [JwtAdminModule, JwtGlobalModule],
})
export class JwtProviderModule {}

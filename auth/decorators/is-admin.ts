import { IS_ADMIN_KEY } from '@/auth/constants';
import { AdminJwtGuard } from '@/auth/guards/admin-jwt.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

export function Admin() {
  return applyDecorators(SetMetadata(IS_ADMIN_KEY, true), UseGuards(AdminJwtGuard));
}

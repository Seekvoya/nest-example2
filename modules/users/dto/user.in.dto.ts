import { ApiProperty, ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { AuthDto } from '@/modules/auth/dto/auth.in.dto';
import { Roles } from '@/modules/users/entities/user.entity';
export class CreateUserDto extends PickType(AuthDto, ['email']) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional()
  middleName?: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(Roles)
  role: Roles;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  telegram: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

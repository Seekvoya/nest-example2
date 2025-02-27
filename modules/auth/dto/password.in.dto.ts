import { Transform } from 'class-transformer';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID, IsUrl, Length } from 'class-validator';
import { AuthDto } from '@/modules/auth/dto/auth.in.dto';

export class ResetPasswordDto extends PickType(AuthDto, ['email']) {
  @Length(8, 32)
  @IsString()
  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  readonly recoveryHash: string;
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @Length(8, 32)
  readonly oldPassword: string;

  @ApiProperty()
  @IsString()
  @Length(8, 32)
  readonly newPassword: string;
}

export class ResetPasswordRequestDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim())
  readonly email: string;

  @ApiProperty()
  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
  })
  readonly recoveryUrl: string;
}

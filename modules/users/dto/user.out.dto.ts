import { Roles, UserEntity } from '@/modules/users/entities/user.entity';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsEnum } from 'class-validator';

@Exclude()
export class UserOutDto
  implements
    Pick<
      UserEntity,
      'id' | 'email' | 'firstName' | 'lastName' | 'middleName' | 'role' | 'telegram' | 'isAdmin'
    >
{
  @Expose()
  @ApiProperty()
  readonly id: string;

  @Expose()
  @ApiProperty()
  readonly email: string;

  @Expose()
  @ApiProperty()
  readonly isAdmin: boolean;

  @Expose()
  @ApiProperty()
  readonly firstName: string;

  @Expose()
  @ApiProperty()
  readonly lastName: string;

  @Expose()
  @ApiProperty()
  readonly middleName: string;

  @Expose()
  @IsEnum(Roles)
  @ApiProperty()
  readonly role: Roles;

  @Expose()
  @ApiProperty()
  readonly telegram: string;
}

@Exclude()
export class UserShortOutDto extends PickType(UserOutDto, ['firstName', 'lastName']) {}

@Exclude()
export class CreatedUserDto {
  @Expose()
  @ApiProperty()
  @Type(() => UserOutDto)
  readonly user: UserOutDto;

  @Expose()
  @ApiProperty()
  readonly generatedPassword: string;
}

@Exclude()
export class EmployeeOutDto extends OmitType(UserOutDto, ['role', 'isAdmin', 'email']) {}

export class EmployeeResponseDto {
  @ApiProperty({ isArray: true, type: EmployeeOutDto })
  data: EmployeeOutDto[];
}

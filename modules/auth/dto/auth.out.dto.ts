import { UserOutDto } from '@/modules/users/dto/user.out.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class OutputAuth {
  @Expose()
  @ApiProperty()
  readonly accessToken: string;

  @Expose()
  @ApiProperty({ type: UserOutDto })
  @Type(() => UserOutDto)
  readonly user: UserOutDto;
}

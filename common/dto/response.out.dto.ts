import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ApiResponseMessageDto {
  @Expose()
  @ApiProperty()
  message: string;

  @Expose()
  @ApiProperty({ default: 200 })
  statusCode: number;
}

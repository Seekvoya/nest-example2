import { Exclude, Expose, Type } from 'class-transformer';
import { FeedbackEntity, Initiator } from '@/modules/feedback/entities/feedback.entity';
import { UserOutDto, UserShortOutDto } from '@/modules/users/dto/user.out.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';

@Exclude()
export class OutputFeedbackDto
  implements Pick<FeedbackEntity, 'id' | 'feedback' | 'date' | 'isPromotion' | 'initiator'>
{
  @Expose()
  @ApiProperty()
  readonly id: string;

  @Expose()
  @ApiProperty()
  readonly feedback: string;

  @Expose()
  @ApiProperty()
  readonly date: Date;

  @Expose()
  @ApiProperty()
  readonly isPromotion: boolean;

  @Expose()
  @ApiProperty({
    type: 'enum',
    enum: Initiator,
  })
  readonly initiator: Initiator;

  @Expose()
  @ApiProperty()
  @Type(() => UserOutDto)
  readonly user: UserOutDto;

  @Expose()
  @ApiProperty()
  @Type(() => UserOutDto)
  readonly feedbacker: UserOutDto;
}
@Exclude()
export class ShortOutFeedbackDto extends PickType(OutputFeedbackDto, [
  'feedback',
  'date',
  'isPromotion',
  'initiator',
]) {
  @Expose()
  @ApiProperty()
  @Type(() => UserShortOutDto)
  readonly user: UserShortOutDto;

  @Expose()
  @ApiProperty()
  @Type(() => UserShortOutDto)
  readonly feedbacker: UserShortOutDto;
}

import { ValidateDataFormat } from '@/decorators/date-parser';
import { Initiator } from '@/modules/feedback/entities/feedback.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class FeedbackQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  id?: string;

  @IsOptional()
  @ValidateDataFormat('YYYY-MM-DD')
  @ApiProperty()
  date?: Date;
}
export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'строка с расширением text, принимающая MarkDown, нет ограничений по символам',
  })
  readonly feedback: string;

  @IsNotEmpty()
  @ValidateDataFormat('YYYY-MM-DD')
  @ApiProperty()
  readonly date: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  readonly isPromotion: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  readonly isArchived: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  readonly isAdmin: boolean;

  @IsNotEmpty()
  @ApiProperty({
    type: 'enum',
    enum: Initiator,
  })
  @IsEnum(Initiator)
  readonly initiator: Initiator;

  @IsUUID()
  @ApiProperty({ example: '1wr4aafe-5485-4054-arr1-a1abd2fa89ab' })
  readonly userId: string;

  @IsUUID()
  @ApiProperty({ example: 'r1839601-0984-6780-arr1-a1abd2fa89ab' })
  readonly feedbackerId: string;
}

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {}

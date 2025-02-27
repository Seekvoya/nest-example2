import { ApiResponseMessageDto } from '@/common/dto/response.out.dto';

export const ApiSuccessResponse = (message = 'Success'): ApiResponseMessageDto => ({
  statusCode: 200,
  message,
});

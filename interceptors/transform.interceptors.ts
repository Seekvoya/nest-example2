import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { ApiResponse } from '@/common/types';

const transformDataToApiResponse = <T>(result: T): ApiResponse<T> => {
  if (Array.isArray(result)) {
    return { data: result } as ApiResponse<T>;
  }
  return result as ApiResponse<T>;
};

@Injectable()
export class FormatResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  intercept(_context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(map(transformDataToApiResponse<T>));
  }
}

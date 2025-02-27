import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Controller, Post, Body, Get, Patch } from '@nestjs/common';

import { AuthDto } from '@/modules/auth/dto/auth.in.dto';
import { OutputAuth } from '@/modules/auth/dto/auth.out.dto';
import { UserOutDto } from '@/modules/users/dto/user.out.dto';
import { ApiResponseMessageDto } from '@/common/dto/response.out.dto';
import {
  ChangePasswordDto,
  ResetPasswordDto,
  ResetPasswordRequestDto,
} from '@/modules/auth/dto/password.in.dto';

import { Public } from '@/auth/decorators/is-public';

import { User } from '@/decorators/user.decorator';
import { AuthService } from '@/modules/auth/auth.service';
import { ApiSuccessResponse } from '@/utils/ApiSuccessResponse';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { ApiDocumentation } from '@/decorators/documentation.decorator';

@Controller('auth')
@ApiTags('Авторизация')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  @ApiDocumentation({
    type: OutputAuth,
    summary: 'Авторизация/регистрация пользователя в системе',
  })
  async auth(@Body() data: AuthDto) {
    const result = await this.authService.auth(data);
    return plainToInstance(OutputAuth, result);
  }

  @Get('/me')
  @ApiDocumentation({
    type: UserOutDto,
    summary: 'Получить информацию о пользователе',
  })
  getInfo(@User() user: UserEntity) {
    return plainToInstance(UserOutDto, user);
  }

  @Public()
  @Post('/password/forgot/request')
  @ApiDocumentation({
    type: ApiResponseMessageDto,
    summary: 'Запросить смену пароля по почте',
  })
  async resetPasswordRequest(@Body() body: ResetPasswordRequestDto) {
    await this.authService.forgotPassword(body);
    return ApiSuccessResponse();
  }

  @Public()
  @Patch('/password/forgot/change')
  @ApiDocumentation({
    type: ApiResponseMessageDto,
    summary: 'Смена пароля по uuid-хешу',
  })
  async resetPassword(@Body() body: ResetPasswordDto) {
    await this.authService.resetPassword(body);
    return ApiSuccessResponse();
  }

  @Patch('/password/change')
  @ApiDocumentation({
    type: ApiResponseMessageDto,
    summary: 'Смена пароля текущего пользователя',
  })
  async changePassword(@User() user: UserEntity, @Body() body: ChangePasswordDto) {
    await this.authService.changePassword(user, body);
    return ApiSuccessResponse();
  }
}

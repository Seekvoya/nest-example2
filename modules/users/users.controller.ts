import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { UsersService } from '@/modules/users/users.service';
import { ApiDocumentation } from '@/decorators/documentation.decorator';

import { Admin } from '@/auth/decorators/is-admin';
import { CreateUserDto } from '@/modules/users/dto/user.in.dto';
import {
  CreatedUserDto,
  EmployeeOutDto,
  EmployeeResponseDto,
} from '@/modules/users/dto/user.out.dto';

@Controller('users')
@ApiTags('Пользователи')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Admin()
  @Post()
  @ApiDocumentation({
    type: CreatedUserDto,
    summary: 'Создание нового юзера',
  })
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body);
    return plainToInstance(CreatedUserDto, user);
  }

  @Get()
  @ApiDocumentation({
    type: EmployeeResponseDto,
    isArray: true,
    summary: 'Получить список',
  })
  async getEmployees() {
    const employees = await this.usersService.getEmployees();

    return plainToInstance(EmployeeOutDto, employees);
  }
}

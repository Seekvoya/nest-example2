import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Passworder } from '@/lib/Passworder';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '@/modules/users/dto/user.in.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findOneByOrError(where: FindOptionsWhere<UserEntity>, withoutThrow = false) {
    const user = await this.usersRepository.findOne({ where });

    if (!user && !withoutThrow) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getEmployees() {
    return this.usersRepository.find({
      where: {
        isArchived: false,
      },
    });
  }

  async create({ email, ...restData }: CreateUserDto) {
    const found = await this.findOneByOrError({ email }, true);

    if (found) {
      throw new HttpException('This email address is busy', HttpStatus.CONFLICT);
    }

    const { rawPassword, hashedPassword } = await Passworder.generateRandomPassword();

    const newUser = this.usersRepository.create({
      ...restData,
      password: hashedPassword,
      email,
    });

    return {
      generatedPassword: rawPassword,
      user: await newUser.save(),
    };
  }

  async update(id: string, data: UpdateUserDto) {
    const found = await this.findOneByOrError({ id });
    const updated = this.usersRepository.merge(found, data);
    await updated.save();
  }

  async updatePassword(user: UserEntity, password: string) {
    const updated = this.usersRepository.merge(user, { password, recoveryHash: null });
    await this.usersRepository.save(updated);
  }

  async updateRecoveryHash(user: UserEntity, recoveryHash: string) {
    const updated = this.usersRepository.merge(user, { recoveryHash });
    await this.usersRepository.save(updated);
  }
}

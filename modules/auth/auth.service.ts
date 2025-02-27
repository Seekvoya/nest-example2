import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsersService } from '@/modules/users/users.service';
import { TokensService } from '@/modules/tokens/tokens.service';
import { MailerService } from '@nestjs-modules/mailer';

import { AuthDto } from '@/modules/auth/dto/auth.in.dto';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UserOutDto } from '@/modules/users/dto/user.out.dto';
import { Passworder } from '@/lib/Passworder';
import {
  ChangePasswordDto,
  ResetPasswordDto,
  ResetPasswordRequestDto,
} from '@/modules/auth/dto/password.in.dto';
import { templateForgotPassword } from '@/resources/templateForgotPasswordMailer';
import { MailerExceptions } from '@/exceptions/mailer';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly mailerService: MailerService,
  ) {}

  private async validatePasswordOrError(user: UserEntity, password: string) {
    const isValidPassword = await Passworder.validatePassword({
      hashedPassword: user.password,
      password,
    });
    if (!isValidPassword) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }
  }

  async auth({ email, password }: AuthDto) {
    const user = await this.usersService.findOneByOrError({ email });

    await this.validatePasswordOrError(user, password);

    const accessToken = await this.tokensService.generateAccessToken({
      id: user.id,
      isAdmin: user.isAdmin,
    });

    return { accessToken, user: plainToInstance(UserOutDto, user) };
  }

  async forgotPassword({ email, recoveryUrl }: ResetPasswordRequestDto) {
    const user = await this.usersService.findOneByOrError({ email });

    const recoveryHash = uuid4();
    await this.usersService.updateRecoveryHash(user, recoveryHash);
    try {
      await this.mailerService.sendMail({
        to: email,
        ...templateForgotPassword(recoveryHash, recoveryUrl),
      });
    } catch (error) {
      MailerExceptions.FailedSendRecoveryMessage();
    }
  }

  async changePassword(user: UserEntity, { oldPassword, newPassword }: ChangePasswordDto) {
    await this.usersService.findOneByOrError({ email: user.email });
    await this.validatePasswordOrError(user, oldPassword);

    const password = await Passworder.hashPassword(newPassword);
    await this.usersService.updatePassword(user, password);
  }

  async resetPassword({ password, recoveryHash, email }: ResetPasswordDto) {
    const user = await this.usersService.findOneByOrError({ recoveryHash, email });

    const hashedPassword = await Passworder.hashPassword(password);
    await this.usersService.updatePassword(user, hashedPassword);
  }
}

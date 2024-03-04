import { Injectable } from '@nestjs/common';
import { loginDTO } from './dto/login.dto';
import { signUpDTO } from './dto/sign-up.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { query } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  prisma = new PrismaClient();
  async login(body: loginDTO): Promise<string> {
    try {
      const { email, pass_word } = body;

      // checkEmail
      const checkEmail = await this.prisma.users.findFirst({
        where: {
          email,
        },
      });
      if (!checkEmail) {
        return 'User is not exist';
      }

      // checkPassword
      const checkPassword = bcrypt.compareSync(pass_word, checkEmail.pass_word);
      if (!checkPassword) {
        ('Password invalid');
      }

      // create Token
      const payload = {
        used_id: checkEmail.user_id,
        email: checkEmail.email,
        role: checkEmail.role,
      };
      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('SECRET_KEY'),
        expiresIn: '1d',
      });
      return token;
    } catch (error) {
      return `Error: ${error}`;
    }
  }

  async signUp(body: signUpDTO, role: string): Promise<string> {
    try {
      const {
        fullname,
        email,
        pass_word,
        phone,
        birth_day,
        gender,
        skill,
        certification,
      } = body;
      // checkEmail
      const checkEmail = await this.prisma.users.findFirst({
        where: {
          email,
        },
      });
      if (checkEmail) {
        return 'User is existed';
      }

      // hashSyncPw
      const password = bcrypt.hashSync(pass_word, 8);

      // checkAvatar and define if is not exist
      let { avatar } = body;
      if (avatar === '') {
        const initAvatar = fullname.split(' ');
        const avatarName =
          initAvatar[0][0] + initAvatar[initAvatar.length - 1][0];
        avatar = `https://ui-avatars.com/api/?name=${avatarName}&background=random&size=100`;
      }

      // createNewUser
      const newUser = {
        fullname,
        email,
        pass_word: password,
        phone,
        birth_day,
        gender,
        role: role,
        skill,
        certification,
        avatar,
      };
      await this.prisma.users.create({
        data: newUser,
      });

      return 'Create user successful';
    } catch (error) {
      return `Error: ${error}`;
    }
  }
}

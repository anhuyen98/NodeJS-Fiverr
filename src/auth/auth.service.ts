import { Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { loginDTO } from './dto/login.dto';
import { signUpDTO } from './dto/sign-up.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  prisma = new PrismaClient();
  async login(body: loginDTO): Promise<any> {
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

  async signUp(body: signUpDTO): Promise<any> {
    try {
      const {
        fullname,
        email,
        pass_word,
        phone,
        birth_day,
        gender,
        role,
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

      // createNewUser
      const newUser = {
        fullname,
        email,
        pass_word: password,
        phone,
        birth_day,
        gender,
        role,
        skill,
        certification,
      };
      await this.prisma.users.create({
        data: newUser,
      });

      return 'Create user successful';
    } catch (error) {
      return `Error: ${error}`;
    }
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

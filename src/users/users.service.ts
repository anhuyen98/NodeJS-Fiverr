import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { signUpDTO } from 'src/auth/dto/sign-up.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private cloudinary: CloudinaryService) {}
  prisma = new PrismaClient();

  async getListUser(): Promise<object | string> {
    try {
      const data = await this.prisma.users.findMany();
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async searchUserName(userName: string): Promise<object | string> {
    try {
      const searchData = await this.prisma.users.findMany({
        where: {
          fullname: {
            contains: userName,
          },
        },
        select: {
          fullname: true,
          skill: true,
          certification: true,
        },
      });
      return searchData;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async pagination(
    page: number,
    size: number,
    searchName: string = '',
  ): Promise<object | string> {
    try {
      const index = (page - 1) * size;
      const offset = size;
      const data = await this.prisma.users.findMany({
        skip: index,
        take: offset,
        where: {
          fullname: {
            contains: searchName,
          },
        },
        select: {
          fullname: true,
          skill: true,
          certification: true,
        },
      });
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async userByID(id: number): Promise<object | string> {
    try {
      const data = await this.prisma.users.findFirst({
        where: {
          user_id: id,
        },
      });
      if (!data) {
        return 'User is not existed';
      }
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async createUser(body: signUpDTO, role: string): Promise<string> {
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
      const isEmail = await this.prisma.users.findFirst({
        where: {
          email: email,
        },
      });
      if (isEmail) {
        return 'Email is existed';
      }
      const password = bcrypt.hashSync(pass_word, 8);

      let { avatar } = body;
      if (avatar === '') {
        const initAvatar = fullname.split(' ');
        const avatarName =
          initAvatar[0][0] + initAvatar[initAvatar.length - 1][0];
        avatar = `https://ui-avatars.com/api/?name=${avatarName}&background=random&size=100`;
      }
      const newData: signUpDTO = {
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
        data: newData,
      });
      return 'Create successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async updateUser(id: number, body: signUpDTO): Promise<string> {
    try {
      const isExist = await this.prisma.users.findFirst({
        where: {
          user_id: id,
        },
      });
      if (!isExist) {
        return 'User is not exist';
      }
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
        avatar,
      } = body;
      const password = bcrypt.hashSync(pass_word, 8);
      const newData: signUpDTO = {
        fullname,
        email,
        pass_word: password,
        phone,
        birth_day,
        gender,
        role,
        skill,
        certification,
        avatar,
      };
      await this.prisma.users.update({
        where: {
          user_id: id,
        },
        data: newData,
      });
      return 'Update successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async deleteUser(id: number): Promise<string> {
    try {
      const isExist = await this.prisma.users.findFirst({
        where: {
          user_id: id,
        },
      });
      if (!isExist) {
        return 'User is not exist';
      }
      await this.prisma.users.delete({
        where: {
          user_id: isExist.user_id,
        },
      });
      return 'Delete successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async uploadAvatar(file: Express.Multer.File, id: number): Promise<string> {
    try {
      const isExist = await this.prisma.users.findFirst({
        where: {
          user_id: id,
        },
      });
      if (!isExist) {
        return 'User is not exist';
      }
      const uploadFile = await this.cloudinary.uploadFile(file);
      if (!uploadFile) {
        return 'Failed';
      }
      const newAvatar = {
        ...isExist,
        avatar: uploadFile.url,
      };
      await this.prisma.users.update({
        where: {
          user_id: isExist.user_id,
        },
        data: newAvatar,
      });
      return 'Successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }
}

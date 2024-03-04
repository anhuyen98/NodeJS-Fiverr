import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SkillService {
  prisma = new PrismaClient();
  async findAll(): Promise<string | object> {
    try {
      const data = this.prisma.users.findMany({
        select: {
          skill: true,
        },
      });
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }
}

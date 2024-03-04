import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { jobTypeDTO } from './dto/job-type.dto';

@Injectable()
export class JobTypeService {
  prisma = new PrismaClient();

  async getListJobType(): Promise<object | string> {
    try {
      const data = await this.prisma.job_type.findMany();
      return data;
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
      const data = await this.prisma.job_type.findMany({
        skip: index,
        take: offset,
        where: {
          job_type_name: {
            contains: searchName,
          },
        },
      });
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async jobTypeByID(id: number): Promise<object | string> {
    try {
      const data = await this.prisma.job_type.findFirst({
        where: {
          job_type_id: id,
        },
      });
      if (!data) {
        return 'Job-type is not existed';
      }
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async createJobType(body: jobTypeDTO): Promise<string> {
    try {
      const { job_type_name } = body;
      const isExist = await this.prisma.job_type.findFirst({
        where: {
          job_type_name: job_type_name,
        },
      });
      if (isExist) {
        return 'Job-type is existed';
      }
      const newData: jobTypeDTO = {
        job_type_name,
      };
      await this.prisma.job_type.create({
        data: newData,
      });
      return 'Create successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async updateJobType(id: number, body: jobTypeDTO): Promise<string> {
    try {
      const isExist = await this.prisma.job_type.findFirst({
        where: {
          job_type_id: id,
        },
      });
      if (!isExist) {
        return 'Job-type is not existed';
      }
      const { job_type_name } = body;
      const newData: jobTypeDTO = {
        job_type_name,
      };
      await this.prisma.job_type.update({
        where: {
          job_type_id: isExist.job_type_id,
        },
        data: newData,
      });
      return 'Update successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async deleteJobType(id: number): Promise<string> {
    try {
      const isExist = await this.prisma.job_type.findFirst({
        where: {
          job_type_id: id,
        },
      });
      if (!isExist) {
        return 'Job-type is not existed';
      }
      await this.prisma.job_type.delete({
        where: {
          job_type_id: isExist.job_type_id,
        },
      });
      return 'Delete successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }
}

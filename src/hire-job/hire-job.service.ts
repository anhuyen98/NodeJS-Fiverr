import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { hireJobDTO } from './dto/hire-job.dto';

@Injectable()
export class HireJobService {
  prisma = new PrismaClient();
  async getListHireJob(): Promise<object | string> {
    try {
      const data = await this.prisma.hire_job.findMany();
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async HiredJob(userID: number): Promise<object | string> {
    try {
      const isUser = await this.prisma.users.findFirst({
        where: {
          user_id: userID,
        },
      });
      if (!isUser) {
        return 'User is not existed';
      }
      const data = await this.prisma.hire_job.findMany({
        where: {
          user_id: userID,
        },
      });
      if (!data) {
        return 'Not Found';
      }
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async getHireJobById(id: number): Promise<object | string> {
    try {
      const data = await this.prisma.hire_job.findFirst({
        where: {
          job_id: id,
        },
      });
      if (!data) {
        return 'Hire-job is not existed';
      }
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async pagination(page: number, size: number): Promise<object | string> {
    try {
      const index = (page - 1) * size;
      const offset = size;
      const data = await this.prisma.hire_job.findMany({
        skip: index,
        take: offset,
      });
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async createHireJob(body: hireJobDTO): Promise<string> {
    try {
      const { job_id, user_id } = body;
      const isJob = await this.prisma.job.findFirst({
        where: {
          job_id: job_id,
        },
      });
      const isUser = await this.prisma.users.findFirst({
        where: {
          user_id: user_id,
        },
      });
      if (!isJob) {
        return 'Job is not existed';
      }
      if (!isUser) {
        return 'User is not existed';
      }
      const newData: hireJobDTO = {
        job_id,
        user_id,
        hire_day: new Date(Date.now()),
        finish: false,
      };
      await this.prisma.hire_job.create({
        data: newData,
      });
      return 'Create successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async updateHireJob(id: number, body: hireJobDTO): Promise<string> {
    try {
      const isExist = await this.prisma.hire_job.findFirst({
        where: {
          hire_job_id: id,
        },
      });
      if (!isExist) {
        return 'Hire job is not existed';
      }
      const { job_id, user_id, finish } = body;
      const isJob = await this.prisma.job.findFirst({
        where: {
          job_id: job_id,
        },
      });
      const isUser = await this.prisma.users.findFirst({
        where: {
          user_id: user_id,
        },
      });
      if (!isJob) {
        return 'Job is not existed';
      }
      if (!isUser) {
        return 'User is not existed';
      }
      const newData: hireJobDTO = {
        job_id,
        user_id,
        hire_day: new Date(Date.now()),
        finish,
      };
      await this.prisma.hire_job.update({
        where: {
          hire_job_id: isExist.hire_job_id,
        },
        data: newData,
      });
      return 'Update successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async deleteHireJob(id: number): Promise<string> {
    try {
      const isExist = await this.prisma.hire_job.findFirst({
        where: {
          hire_job_id: id,
        },
      });
      if (!isExist) {
        return 'Hire job is not existed';
      }
      await this.prisma.hire_job.delete({
        where: {
          hire_job_id: isExist.hire_job_id,
        },
      });
      return 'Delete successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async completeHirejob(id: number): Promise<string> {
    try {
      const isExist = await this.prisma.hire_job.findFirst({
        where: {
          hire_job_id: id,
        },
      });
      if (!isExist) {
        return 'Hire job is not existed';
      }
      const changeData = {
        ...isExist,
        finish: true,
      };
      await this.prisma.hire_job.update({
        data: changeData,
        where: {
          hire_job_id: isExist.hire_job_id,
        },
      });
      return 'Complete hire job';
    } catch (error) {
      return `Error ${error}`;
    }
  }
}

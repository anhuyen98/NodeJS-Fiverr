import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { jobDTO } from './dto/job.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class JobService {
  constructor(private cloudinary: CloudinaryService) {}
  prisma = new PrismaClient();
  async getListJob(): Promise<object | string> {
    try {
      const data = await this.prisma.job.findMany();
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async pagination(page: number, size: number): Promise<object | string> {
    try {
      const index = (page - 1) * size;
      const offset = size;
      const data = await this.prisma.job.findMany({
        skip: index,
        take: offset,
      });
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async listMenu(): Promise<object | string> {
    try {
      const data = await this.prisma.job_type.findMany({
        select: {
          job_type_id: true,
          job_type_name: true,
          Detail_job: {
            select: {
              detail_job_id: true,
              detail_name: true,
              detail_image: true,
              Detail: {
                select: {
                  detail_id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async byJobType(jobTypeId: number): Promise<object | string> {
    try {
      const data = await this.prisma.job_type.findFirst({
        where: {
          job_type_id: jobTypeId,
        },
        select: {
          job_type_id: true,
          job_type_name: true,
          Detail_job: {
            select: {
              detail_job_id: true,
              detail_name: true,
              detail_image: true,
              Detail: {
                select: {
                  detail_id: true,
                  name: true,
                },
              },
            },
          },
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

  async byDetail(detailId: number): Promise<object | string> {
    try {
      const data = await this.prisma.detail.findMany({
        where: {
          detail_id: detailId,
        },
        include: {
          Detail_job: {
            select: {
              detail_name: true,
              Job_type: true,
            },
          },
          Job: true,
        },
      });
      if (!data) {
        return 'Detail is not existed';
      }

      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async byJobName(jobName: string): Promise<object | string> {
    try {
      const data = await this.prisma.job.findMany({
        where: {
          job_name: {
            contains: jobName,
          },
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

  async jobId(id: number): Promise<object | string> {
    try {
      const data = await this.prisma.job.findFirst({
        where: {
          job_id: id,
        },
      });
      if (!data) {
        return 'Job is not existed';
      }
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async createJob(body: jobDTO): Promise<string> {
    try {
      const {
        job_name,
        evaluation,
        price,
        job_image,
        description,
        sub_desc,
        job_star,
        detail_id,
        user_id,
      } = body;
      const isDetail = await this.prisma.detail.findFirst({
        where: {
          detail_id: detail_id,
        },
      });
      const isUser = await this.prisma.users.findFirst({
        where: {
          user_id: user_id,
        },
      });
      if (!isDetail) {
        return 'Detail is not existed';
      }
      if (!isUser) {
        return 'User is not existed';
      }
      const newData: jobDTO = {
        job_name,
        evaluation,
        price,
        job_image,
        description,
        sub_desc,
        job_star,
        detail_id,
        user_id,
      };
      await this.prisma.job.create({
        data: newData,
      });
      return 'Create successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async updateJob(id: number, body: jobDTO): Promise<string> {
    try {
      const isExist = await this.prisma.job.findFirst({
        where: {
          job_id: id,
        },
      });
      if (!isExist) {
        return 'Job is not existed';
      }
      const {
        job_name,
        evaluation,
        price,
        job_image,
        description,
        sub_desc,
        job_star,
        detail_id,
        user_id,
      } = body;
      const isDetail = await this.prisma.detail.findFirst({
        where: {
          detail_id: detail_id,
        },
      });
      const isUser = await this.prisma.users.findFirst({
        where: {
          user_id: user_id,
        },
      });
      if (!isDetail) {
        return 'Detail is not existed';
      }
      if (!isUser) {
        return 'User is not existed';
      }
      const newData: jobDTO = {
        job_name,
        evaluation,
        price,
        job_image,
        description,
        sub_desc,
        job_star,
        detail_id,
        user_id,
      };
      await this.prisma.job.update({
        where: {
          job_id: isExist.job_id,
        },
        data: newData,
      });
      return 'Update successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async uploadImage(file: Express.Multer.File, id: number): Promise<string> {
    try {
      const isExist = await this.prisma.job.findFirst({
        where: {
          job_id: id,
        },
      });
      if (!isExist) {
        return 'User is not exist';
      }
      const uploadFile = await this.cloudinary.uploadFile(file);
      if (!uploadFile) {
        return 'Failed';
      }
      const newImage = {
        ...isExist,
        job_image: uploadFile.url,
      };
      await this.prisma.job.update({
        where: {
          job_id: isExist.job_id,
        },
        data: newImage,
      });
      return 'Successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async deleteJob(id: number): Promise<string> {
    try {
      const isExist = await this.prisma.job.findFirst({
        where: {
          job_id: id,
        },
      });
      if (!isExist) {
        return 'Job is not existed';
      }
      await this.prisma.job.delete({
        where: {
          job_id: id,
        },
      });
      return 'Delete successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { detailJobDTO } from './dto/detail-job.dto';
import { detailDTO } from './dto/detail.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class DetailJobService {
  constructor(private cloudinary: CloudinaryService) {}
  prisma = new PrismaClient();
  async getListDetailJob(): Promise<object | string> {
    try {
      const data = await this.prisma.detail_job.findMany({
        include: {
          Detail: {
            select: {
              detail_id: true,
              name: true,
            },
          },
        },
      });
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
      const data = await this.prisma.detail_job.findMany({
        skip: index,
        take: offset,
        where: {
          detail_name: {
            contains: searchName,
          },
        },
      });
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async detailJobById(id: number): Promise<object | string> {
    try {
      const data = await this.prisma.detail_job.findFirst({
        where: {
          detail_job_id: id,
        },
      });
      if (!data) {
        return 'Detail-job is not existed';
      }
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async detailById(id: number): Promise<object | string> {
    try {
      const data = await this.prisma.detail.findFirst({
        where: {
          detail_id: id,
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

  async createDetailJob(body: detailJobDTO): Promise<string> {
    try {
      const { detail_name, detail_image, job_type_id } = body;
      const isJob = await this.prisma.job_type.findFirst({
        where: {
          job_type_id: job_type_id,
        },
      });
      if (!isJob) {
        return 'Job-type is not exist';
      }
      const newData: detailJobDTO = {
        detail_name,
        detail_image,
        job_type_id,
      };
      await await this.prisma.detail_job.create({
        data: newData,
      });
      return 'Create detail-job successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async createDetail(body: detailDTO): Promise<string> {
    try {
      const { detail_job_id, name } = body;
      const isDetailJob = await this.prisma.detail_job.findFirst({
        where: {
          detail_job_id: detail_job_id,
        },
      });
      if (!isDetailJob) {
        return 'Detail-job is not existed';
      }
      const newData = {
        detail_job_id,
        name,
      };
      await this.prisma.detail.create({
        data: newData,
      });
      return 'Create detail successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async updateDetailJob(id: number, body: detailJobDTO): Promise<string> {
    try {
      const data = await this.prisma.detail_job.findFirst({
        where: {
          detail_job_id: id,
        },
      });
      if (!data) {
        return 'Detail-job is not existed';
      }
      const { detail_name, detail_image, job_type_id } = body;
      const isJob = await this.prisma.job_type.findFirst({
        where: {
          job_type_id: job_type_id,
        },
      });
      if (!isJob) {
        return 'Job-type is not exist';
      }
      const newData: detailJobDTO = {
        detail_name,
        detail_image,
        job_type_id,
      };
      await await this.prisma.detail_job.update({
        where: {
          detail_job_id: id,
        },
        data: newData,
      });
      return 'Update detail-job successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async updateDetail(id: number, body: detailDTO): Promise<string> {
    try {
      const isDetail = await this.prisma.detail.findFirst({
        where: {
          detail_id: id,
        },
      });
      if (!isDetail) {
        return 'Detail is not existed';
      }
      const { detail_job_id, name } = body;
      const isDetailJob = await this.prisma.detail_job.findFirst({
        where: {
          detail_job_id: detail_job_id,
        },
      });
      if (!isDetailJob) {
        return 'Detail-job is not existed';
      }
      const newData = {
        detail_job_id,
        name,
      };
      await this.prisma.detail.update({
        where: {
          detail_id: isDetail.detail_id,
        },
        data: newData,
      });
      return 'Update detail successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async uploadImage(file: Express.Multer.File, id: number): Promise<string> {
    try {
      const isExist = await this.prisma.detail_job.findFirst({
        where: {
          detail_job_id: id,
        },
      });
      if (!isExist) {
        return 'Detail-job is not exist';
      }
      const uploadFile = await this.cloudinary.uploadFile(file);
      if (!uploadFile) {
        return 'Failed';
      }
      const newImage = {
        ...isExist,
        detail_image: uploadFile.url,
      };
      await this.prisma.detail_job.update({
        where: {
          detail_job_id: isExist.detail_job_id,
        },
        data: newImage,
      });
      return 'Successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async deleteDetailJob(id: number): Promise<string> {
    try {
      const data = await this.prisma.detail_job.findFirst({
        where: {
          detail_job_id: id,
        },
      });
      if (!data) {
        return 'Detail-job is not existed';
      }
      await this.prisma.detail_job.delete({
        where: {
          detail_job_id: id,
        },
      });
      return 'Delete detail-job successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async deleteDetail(id: number): Promise<string> {
    try {
      const isDetail = await this.prisma.detail.findFirst({
        where: {
          detail_id: id,
        },
      });
      if (!isDetail) {
        return 'Detail is not existed';
      }
      await this.prisma.detail.delete({
        where: {
          detail_id: isDetail.detail_id,
        },
      });
      return 'Delete detail successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }
}

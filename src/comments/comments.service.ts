import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { commentDTO } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  prisma = new PrismaClient();
  async getListComment(): Promise<string | object> {
    try {
      const data = await this.prisma.comments.findMany();
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async pagination(page: number, size: number): Promise<string | object> {
    try {
      const index = (page - 1) * size;
      const offset = size;
      const data = await this.prisma.comments.findMany({
        skip: index,
        take: offset,
      });
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async commentByJobId(id: number): Promise<string | object> {
    try {
      const isExist = await this.prisma.job.findFirst({
        where: {
          job_id: id,
        },
      });
      if (!isExist) {
        return 'Job is not existed';
      }
      const data = await this.prisma.comments.findMany({
        where: {
          job_id: id,
        },
      });
      return data;
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async createComment(body: commentDTO): Promise<string> {
    try {
      const { job_id, user_id, content, comment_star } = body;
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
      const newData: commentDTO = {
        job_id,
        user_id,
        comment_day: new Date(Date.now()),
        content,
        comment_star,
      };
      await this.prisma.comments.create({
        data: newData,
      });
      return 'Create successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async updateComment(id: number, body: commentDTO): Promise<string> {
    try {
      const isExist = await this.prisma.comments.findFirst({
        where: {
          comment_id: id,
        },
      });
      if (!isExist) {
        return 'Comments is not existed';
      }
      const { job_id, user_id, content, comment_star } = body;
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
      const newData: commentDTO = {
        job_id,
        user_id,
        comment_day: new Date(Date.now()),
        content,
        comment_star,
      };
      await this.prisma.comments.update({
        where: {
          comment_id: isExist.comment_id,
        },
        data: newData,
      });
      return 'Update successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }

  async deleteComment(id: number): Promise<string> {
    try {
      const isExist = await this.prisma.comments.findFirst({
        where: {
          comment_id: id,
        },
      });
      if (!isExist) {
        return 'Comments is not existed';
      }
      await this.prisma.comments.delete({
        where: {
          comment_id: id,
        },
      });
      return 'Delete successful';
    } catch (error) {
      return `Error ${error}`;
    }
  }
}

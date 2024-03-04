import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { jobDTO } from './dto/job.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/middleware/jwt-auth';
import { RolesGuard } from 'src/middleware/role/roles.guard';
import { Roles } from 'src/middleware/role/roles.decorator';
import { Role } from 'src/middleware/role/role.enum';
import { fileDTO } from 'src/types/file.dto';
// import { Role } from 'src/middleware/role/role.enum';

@ApiTags('CongViec')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  getListJob(): Promise<object | string> {
    return this.jobService.getListJob();
  }

  @ApiParam({
    name: 'page',
    type: String,
    description: 'page you need get data',
  })
  @ApiParam({
    name: 'size',
    type: String,
    description: 'limit data in one page',
  })
  @Get('pagination/:page/:size')
  pagination(
    @Param('page') page: string,
    @Param('size') size: string,
  ): Promise<object | string> {
    return this.jobService.pagination(+page, +size);
  }

  @Get('/get-list/menu-job')
  listMenu(): Promise<object | string> {
    return this.jobService.listMenu();
  }

  @Get('/get-job/by-job-type')
  byJobType(@Query('jobTypeId') jobTypeId: string): Promise<object | string> {
    return this.jobService.byJobType(+jobTypeId);
  }

  @Get('/get-job/by-detail')
  byDetail(@Query('detailId') detailId: string): Promise<object | string> {
    return this.jobService.byDetail(+detailId);
  }

  @Get('/get-job/by-job-name')
  byJobName(@Query('jobName') jobName: string): Promise<object | string> {
    return this.jobService.byJobName(jobName);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiParam({ name: 'jobID', description: 'Job ID', type: String })
  @Get(':jobID')
  jobId(@Param('jobID') id: string): Promise<object | string> {
    return this.jobService.jobId(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Post('/create-job')
  @ApiBody({ type: jobDTO })
  createJob(@Body() body: jobDTO): Promise<string> {
    return this.jobService.createJob(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file image job',
    type: fileDTO,
  })
  @Post('/upload-image-job/:jobID')
  @ApiParam({ name: 'jobID', description: 'Job ID', type: String })
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('jobID') id: string,
  ): Promise<string> {
    return this.jobService.uploadImage(file, +id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiParam({ name: 'jobID', description: 'Job ID', type: String })
  @ApiBody({ type: jobDTO })
  @Put('/update-job/:jobID')
  updateJob(@Param('jobID') id: string, @Body() body: jobDTO): Promise<string> {
    return this.jobService.updateJob(+id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiParam({ name: 'jobID', description: 'Job ID', type: String })
  @Delete('/delete-job/:jobID')
  deleteJob(@Param('jobID') id: string): Promise<string> {
    return this.jobService.deleteJob(+id);
  }
}

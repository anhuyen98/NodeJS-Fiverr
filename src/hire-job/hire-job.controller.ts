import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { hireJobDTO } from './dto/hire-job.dto';
import { JwtAuthGuard } from 'src/middleware/jwt-auth';
import { RolesGuard } from 'src/middleware/role/roles.guard';
import { Roles } from 'src/middleware/role/roles.decorator';
import { Role } from 'src/middleware/role/role.enum';

@ApiTags('ThueCongViec')
@Controller('hire-job')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) {}

  @Get()
  getListHireJob(): Promise<object | string> {
    return this.hireJobService.getListHireJob();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiParam({ name: 'userID', type: String, description: 'Hire-job ID' })
  @Get('/list-hired/:userID')
  HiredJob(@Param('userID') userID): Promise<object | string> {
    return this.hireJobService.HiredJob(+userID);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiParam({ name: 'hireJobID', type: String, description: 'Hire-job ID' })
  @Get(':hireJobID')
  getHireJobById(@Param('hireJobID') id: string): Promise<object | string> {
    return this.hireJobService.getHireJobById(+id);
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
  @Get('search&pagination/:page/:size')
  pagination(
    @Param('page') page: string,
    @Param('size') size: string,
  ): Promise<object | string> {
    return this.hireJobService.pagination(+page, +size);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Post('/create-hire-job')
  @ApiBody({ type: hireJobDTO })
  createHireJob(@Body() body: hireJobDTO): Promise<string> {
    return this.hireJobService.createHireJob(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Post('/complete-hire-job/:hireJobID')
  @ApiParam({ name: 'hireJobID', type: String, description: 'Hire-job ID' })
  completeHireJob(@Param('hireJobID') id: string): Promise<string> {
    return this.hireJobService.completeHirejob(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Put('/update-hire-job/:hireJobID')
  @ApiBody({ type: hireJobDTO })
  @ApiParam({ name: 'hireJobID', description: 'Hire-job ID', type: String })
  updateHireJob(
    @Param('hireJobID') id: string,
    @Body() body: hireJobDTO,
  ): Promise<string> {
    return this.hireJobService.updateHireJob(+id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete('/delete-hire-job/:hireJobID')
  @ApiParam({ name: 'hireJobID', description: 'Hire-job ID', type: String })
  deleteHireJob(@Param('hireJobID') id: string): Promise<string> {
    return this.hireJobService.deleteHireJob(+id);
  }
}

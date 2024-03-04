import { PartialType } from '@nestjs/swagger';
import { CreateDetailJobDto } from './create-detail-job.dto';

export class UpdateDetailJobDto extends PartialType(CreateDetailJobDto) {}

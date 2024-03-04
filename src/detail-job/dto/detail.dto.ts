import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class detailDTO {
  @ApiProperty({ type: String, description: 'Name of detail' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Number, description: 'Detail-job ID' })
  @IsNotEmpty()
  detail_job_id: number;
}

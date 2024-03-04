import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class jobTypeDTO {
  @ApiProperty({ type: String, description: 'Job-type name' })
  @IsNotEmpty()
  job_type_name: string;
}

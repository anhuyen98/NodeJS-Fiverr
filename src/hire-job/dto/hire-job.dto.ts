import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class hireJobDTO {
  @ApiProperty({ type: Number, description: 'Job ID' })
  @IsNotEmpty()
  job_id: number;

  @ApiProperty({ type: Number, description: 'User ID' })
  @IsNotEmpty()
  user_id: number;

  // @ApiProperty({ type: Date, description: 'Date hire job' })
  hire_day: Date;

  // @ApiProperty({ type: Boolean, description: 'Progress in job your hire' })
  finish: boolean;
}

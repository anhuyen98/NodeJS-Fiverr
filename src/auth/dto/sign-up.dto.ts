import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class signUpDTO {
  @ApiProperty({ type: String, description: 'Your fullname' })
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ type: String, description: 'Your email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, description: 'Your password' })
  @IsNotEmpty()
  pass_word: string;

  @ApiProperty({ type: String, description: 'Your telephone' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ type: String, description: 'Your birthday' })
  @IsNotEmpty()
  birth_day: string;

  @ApiProperty({ type: String, description: 'Your gender' })
  @IsNotEmpty()
  gender: string;

  // @ApiProperty({ type: String, description: 'Role in website' })
  role: string;

  @ApiProperty({ type: String, description: 'Your skill' })
  @IsNotEmpty()
  skill: string;

  @ApiProperty({ type: String, description: 'Your certification' })
  @IsNotEmpty()
  certification: string;

  // @ApiProperty({ type: String, description: 'Your avatar' })
  avatar: string;
}

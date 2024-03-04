import { Controller, Post, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/login.dto';
import { signUpDTO } from './dto/sign-up.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/middleware/role/role.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: loginDTO })
  login(@Body() body: loginDTO): Promise<string> {
    return this.authService.login(body);
  }

  @ApiQuery({ name: 'role', enum: Role })
  @ApiBody({ type: signUpDTO })
  @Post('/sign-up')
  signUp(
    @Body() body: signUpDTO,
    @Query('role') role: string,
  ): Promise<string> {
    return this.authService.signUp(body, role);
  }
}

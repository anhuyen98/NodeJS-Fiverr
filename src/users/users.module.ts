import {
  // MiddlewareConsumer,
  Module,
  // NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
// import { checkUser } from 'src/middleware/checkUser.middleware';

@Module({
  imports: [JwtModule.register({}), CloudinaryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
// export class UsersModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(checkUser).forRoutes({
//       path: '/users/:id',
//       method: RequestMethod.GET,
//     });
//   }
// }

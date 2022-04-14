import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModel } from './models/auth.model';
import { ProfileModel } from 'src/profile/models/profile.model';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    SequelizeModule.forFeature([AuthModel, ProfileModel]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '12h',
      },
    }),
  ],
})
export class AuthModule {}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthModel } from './models/auth.model';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { createUserDto } from './dtos/create-user.dto';
import { ProfileModel } from 'src/profile/models/profile.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel) private authRepository: typeof AuthModel,
    @InjectModel(ProfileModel) private profileRepository: typeof ProfileModel,
    private jwtService: JwtService,
  ) {}

  async register(userDto: createUserDto) {
    const candidate = await this.authRepository.findOne({
      where: { email: userDto.email },
    });

    if (candidate) {
      throw new HttpException(
        `User with email: ${userDto.email} is already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 4);
    const user = await this.authRepository.create({
      email: userDto.email,
      password: hashPassword,
    });

    const payload = { email: user.email, password: user.password, id: user.id };
    const token = this.jwtService.sign(payload);
    return {
      token,
    };
  }

  async login(userDto: createUserDto) {
    const candidate = await this.authRepository.findOne({
      where: { email: userDto.email },
    });

    if (!candidate) {
      throw new HttpException(
        `User with email ${userDto.email} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const isPassEquals = await bcrypt.compare(
      userDto.password,
      candidate.password,
    );
    if (!isPassEquals) {
      throw new HttpException(`Password is not correct.`, HttpStatus.FORBIDDEN);
    }
    const payload = {
      email: candidate.email,
      password: candidate.password,
      id: candidate.id,
    };
    const token = this.jwtService.sign(payload);
    return {
      token,
    };
  }

  async updateLastSeen(profileId: number) {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
    });

    const newLastSeen = new Date(Date.now()).getTime();
    profile.lastSeen = newLastSeen;
    await profile.save();
    return { profile };
  }
}

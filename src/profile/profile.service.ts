import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthModel } from 'src/auth/models/auth.model';
import { FileService, FileType } from 'src/file/file.service';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { ProfileModel } from './models/profile.model';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(ProfileModel) private profileRepository: typeof ProfileModel,
    @InjectModel(AuthModel) private authRepository: typeof AuthModel,
    private fileService: FileService,
  ) {}

  async create(profileDto: CreateProfileDto, avatar: Express.Multer.File) {
    try {
      const registeredUser = await this.authRepository.findOne({
        where: { email: profileDto.email },
      });
      if (!registeredUser) {
        throw new HttpException(
          `User with email ${profileDto.email} is not registered.`,
          HttpStatus.NOT_FOUND,
        );
      }
      const candidate = await this.profileRepository.findOne({
        where: { email: profileDto.email },
      });
      if (candidate) {
        return candidate;
      }
      const lastSeen = new Date(Date.now()).getTime();
      const avatarURL = this.fileService.createFile(avatar, FileType.IMAGE);
      const profile = await this.profileRepository.create({
        ...profileDto,
        lastSeen,
        avatar: avatarURL,
      });

      profile.authId = registeredUser.id;
      registeredUser.profileId = profile.id;
      await profile.save();
      await registeredUser.save();
      return {
        profile,
      };
    } catch (error) {
      throw new HttpException(
        `Error while creating user profile: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getByEmail(email: string) {
    const profile = await this.profileRepository.findOne({ where: { email } });
    return profile;
  }

  async getById(id: string) {
    if (id) {
      try {
        console.log('PROFILEID: ', id);
        const profile = await this.profileRepository.findOne({ where: { id } });
        return profile;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getAll() {
    const profiles = await this.profileRepository.findAll();
    return profiles;
  }
}

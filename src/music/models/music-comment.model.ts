import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProfileModel } from 'src/profile/models/profile.model';
import { MusicModel } from './music.model';

interface musicCommentCreatingAttrs {
  text: string;
  sentAt: string;
  senderId: number;
}

@Table({ tableName: 'music-comment' })
export class MusicCommentModel extends Model<
  MusicCommentModel,
  musicCommentCreatingAttrs
> {
  id: number;

  @Column({ type: DataType.STRING })
  text: string;

  @Column({ type: DataType.STRING })
  sentAt: string;

  @ForeignKey(() => MusicModel)
  @Column({ type: DataType.INTEGER })
  musicId: number;

  @ForeignKey(() => ProfileModel)
  @Column({ type: DataType.INTEGER })
  senderId: number;
}

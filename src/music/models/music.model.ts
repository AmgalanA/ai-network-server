import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProfileModel } from 'src/profile/models/profile.model';
import { MusicCommentModel } from './music-comment.model';

interface musicCreatingAttrs {
  name: string;
  artist: string;
  creatorId: number | string;
  description: string;
  listens: string;
  picture: string;
  audio: string;
  createdAt: string;
}

@Table({ tableName: 'music' })
export class MusicModel extends Model<MusicModel, musicCreatingAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  artist: string;

  @Column({ type: DataType.STRING })
  createdAt: string;

  @ForeignKey(() => ProfileModel)
  @Column({ type: DataType.INTEGER })
  creatorId: number | string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  listens: number;

  @Column({ type: DataType.STRING })
  picture: string;

  @Column({ type: DataType.STRING })
  audio: string;

  @HasMany(() => MusicCommentModel)
  comments: MusicCommentModel[];
}

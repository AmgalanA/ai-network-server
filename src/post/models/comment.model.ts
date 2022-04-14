import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProfileModel } from 'src/profile/models/profile.model';
import { PostModel } from './post.model';

interface CommentCreatingAttrs {
  senderId: number;
  comment: string;
  sentAt: string | Date | number;
  postId: number;
}

@Table({ tableName: 'comment' })
export class CommentModel extends Model<CommentModel, CommentCreatingAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  comment: string;

  @Column({ type: DataType.STRING })
  sentAt: string;

  @ForeignKey(() => ProfileModel)
  @Column({ type: DataType.INTEGER })
  senderId: number;

  @ForeignKey(() => PostModel)
  @Column({ type: DataType.INTEGER })
  postId: number;
}

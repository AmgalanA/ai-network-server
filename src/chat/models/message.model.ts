import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ChatModel } from 'src/chat/models/chat.model';
import { ProfileModel } from 'src/profile/models/profile.model';

@Table({ tableName: 'message' })
export class MessageModel extends Model<MessageModel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  text: string;

  @Column({ type: DataType.STRING })
  sentAt: string;

  @ForeignKey(() => ProfileModel)
  @Column({ type: DataType.INTEGER })
  senderId: number;

  @ForeignKey(() => ChatModel)
  @Column({ type: DataType.INTEGER })
  chatId: number;
}

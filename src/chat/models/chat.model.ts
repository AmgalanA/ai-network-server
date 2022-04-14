import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { MessageModel } from 'src/chat/models/message.model';

interface creatingChatAttrs {
  firstProfileId: number;
  secondProfileId: number;
}

@Table({ tableName: 'chat' })
export class ChatModel extends Model<ChatModel, creatingChatAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER })
  firstProfileId: number;

  @Column({ type: DataType.INTEGER })
  secondProfileId: number;

  @HasMany(() => MessageModel)
  messages: MessageModel[];
}

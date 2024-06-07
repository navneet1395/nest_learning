import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
export enum Category {
  ADVENTURE = 'Adventure',
  CLASSIC = 'Classic',
  ROMANCE = 'Romance',
  CRIME = 'Crime',
  FANTASY = 'Fatntasy',
}
@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  authorName: string;
  @Prop()
  price: number;
  @Prop()
  category: Category;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);

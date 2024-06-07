import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from './schema/book.schema';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schema/user.schema';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    console.log(query);
    const resPerPage = Number(query?.limit) || 10;
    const currentPage = Number(query?.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    const keyword = query?.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i', // to make the search case insensitive
          },
        }
      : {};
    const book = await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return book;
  }

  async findById(bookId: string): Promise<Book> {
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      throw new BadRequestException(
        'Invalid Book Id. Please Enter a correct id',
      );
    }
    const book = await this.bookModel.findById(bookId);
    if (!book) {
      throw new NotFoundException('Book Not Found');
    }
    return book;
  }
  async create(book: Book, user: User): Promise<Book> {
    const data = Object.assign(book, { user: user._id });

    const res = await this.bookModel.create(data);
    return res;
  }
  async update(bookId: string, book: Book): Promise<Book> {
    const res = await this.bookModel.findByIdAndUpdate(bookId, book, {
      new: true,
    });
    if (!res) {
      throw new NotFoundException('Book Not Found');
    }
    return res;
  }

  async delete(bookId: string): Promise<Book> {
    const res = await this.bookModel.findByIdAndDelete(bookId);
    if (!res) {
      throw new NotFoundException('Book Not Found');
    }
    return res;
  }
}

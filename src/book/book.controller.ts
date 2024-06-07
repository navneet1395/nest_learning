import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { createBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  async allBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Get(':id')
  async getBookById(@Param('id') bookId: string): Promise<Book> {
    return this.bookService.findById(bookId);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createBook(@Body() book: createBookDto, @Req() req): Promise<Book> {
    return this.bookService.create(book, req.user);
  }

  @Put(':id')
  async updateBookById(
    @Param('id') bookId: string,
    @Body() book: updateBookDto,
  ): Promise<Book> {
    return this.bookService.update(bookId, book);
  }

  @Delete(':id')
  async deleteBookById(@Param('id') bookId: string): Promise<Book> {
    return this.bookService.delete(bookId);
  }
}

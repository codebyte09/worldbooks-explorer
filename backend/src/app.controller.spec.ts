import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('api')
export class AppController {
  @Get('products')
  @ApiOperation({ summary: 'Returns a list of products based on category and search query' })
  @ApiQuery({ name: 'category', required: false, description: 'The category slug (e.g., books)' })
  @ApiQuery({ name: 'q', required: false, description: 'A search query to filter by title or author' })
  getProducts(@Query('category') category: string | undefined, @Query('q') query: string | undefined) {
    const allBooks = [
      { id: 1, title: 'Book One', author: 'Author A', category: 'books', price: 100 },
      { id: 2, title: 'Book Two', author: 'Author B', category: 'books', price: 150 },
      { id: 3, title: 'Book Three', author: 'Author C', category: 'books', price: 200 },
      { id: 4, title: 'Book Four', author: 'Author A', category: 'books', price: 250 },
      { id: 5, title: 'Book Five', author: 'Author D', category: 'books', price: 125 },
    ];

    let filteredBooks = allBooks;

    if (typeof category === 'string') {
      filteredBooks = filteredBooks.filter(book => book.category === category);
    }

    if (typeof query === 'string') {
      const lowercaseQuery = query.toLowerCase();
      filteredBooks = filteredBooks.filter(book =>
        book.title.toLowerCase().includes(lowercaseQuery) ||
        book.author.toLowerCase().includes(lowercaseQuery)
      );
    }

    return filteredBooks;
  }
}
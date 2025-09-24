import { Controller, Get, Query } from '@nestjs/common';
import { WorldOfBooksScraper } from './worldofbooks.scraper';

@Controller('api/scrape')
export class ScraperController {
  constructor(private readonly scraper: WorldOfBooksScraper) {}

  @Get('category')
  async scrapeCategory(@Query('url') url: string) {
    if (!url) return { error: 'Missing url parameter' };
    const products = await this.scraper.scrapeCategory(url);
    return { items: products, total: products.length };
  }
}
import { PlaywrightCrawler, Dataset } from 'crawlee';
import { Injectable } from '@nestjs/common';

export interface ScrapedProduct {
  title: string;
  author: string;
  price: string;
  currency: string;
  image_url: string;
  source_url: string;
  source_id: string;
}

@Injectable()
export class WorldOfBooksScraper {
  async scrapeCategory(categoryUrl: string): Promise<ScrapedProduct[]> {
    const results: ScrapedProduct[] = [];
    const crawler = new PlaywrightCrawler({
      maxRequestsPerCrawl: 20,
      requestHandler: async ({ page, request }) => {
        await page.waitForSelector('.SearchResultsGrid__Grid-sc-1v4g5z2-0');
        const products = await page.$$eval('.SearchResultProduct__Container-sc-1v4g5z2-1', (nodes) =>
          nodes.map((el) => ({
            title: (el.querySelector('.SearchResultProduct__Title-sc-1v4g5z2-4') as HTMLElement)?.innerText || '',
            author: (el.querySelector('.SearchResultProduct__Author-sc-1v4g5z2-5') as HTMLElement)?.innerText || '',
            price: (el.querySelector('.SearchResultProduct__Price-sc-1v4g5z2-6') as HTMLElement)?.innerText.replace(/[^\d.]/g, '') || '',
            currency: 'GBP',
            image_url: (el.querySelector('img') as HTMLImageElement)?.src || '',
            source_url: (el.querySelector('a') as HTMLAnchorElement)?.href || request.url,
            source_id: (el.querySelector('a') as HTMLAnchorElement)?.href?.split('/').pop() || '',
          }))
        );
        results.push(...products);
      },
    });
    await crawler.run([categoryUrl]);
    return results;
  }
}

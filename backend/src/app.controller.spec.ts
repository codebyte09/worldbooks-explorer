import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorldofbooksScraper } from './scraper/worldofbooks.scraper';
import { ScraperController } from './scraper/scraper.controller';

import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Navigation } from './entities/navigation.entity';
import { ProductDetail } from './entities/product_detail.entity';
import { Review } from './entities/review.entity';
import { ScrapeJob } from './entities/scrape_job.entity';
import { ViewHistory } from './entities/view_history.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('NODE_ENV') !== 'production', // Set to false in production
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Product,
      Category,
      Navigation,
      ProductDetail,
      Review,
      ScrapeJob,
      ViewHistory,
    ]),
  ],
  controllers: [AppController, ScraperController],
  providers: [AppService, WorldofbooksScraper],
})
export class AppModule {
  constructor() {
    dotenv.config();
  }
}
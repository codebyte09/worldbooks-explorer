import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorldOfBooksScraper } from './scraper/worldofbooks.scraper';
import { ScraperController } from './scraper/scraper.controller';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Navigation } from './entities/navigation.entity';
import { ProductDetail } from './entities/product_detail.entity';
import { Review } from './entities/review.entity';
import { ScrapeJob } from './entities/scrape_job.entity';
import { ViewHistory } from './entities/view_history.entity';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'worldbooks',
      entities: [Product, Category, Navigation, ProductDetail, Review, ScrapeJob, ViewHistory],
      autoLoadEntities: true,
      synchronize: String(process.env.DB_SYNC || 'true') === 'true',
      retryAttempts: 1,
      retryDelay: 1000,
    }),
    TypeOrmModule.forFeature([Product, Category, Navigation, ProductDetail, Review, ScrapeJob, ViewHistory]),
  ],
  controllers: [AppController, ScraperController],
  providers: [AppService, WorldOfBooksScraper],
})
export class AppModule {}

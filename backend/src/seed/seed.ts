import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Navigation } from '../entities/navigation.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'worldbooks',
  entities: [Product, Category, Navigation],
  synchronize: false,
});

async function run() {
  await dataSource.initialize();
  const productRepo = dataSource.getRepository(Product);
  const categoryRepo = dataSource.getRepository(Category);
  const navRepo = dataSource.getRepository(Navigation);

  let nav = await navRepo.findOne({ where: { slug: 'books' } });
  if (!nav) {
    nav = navRepo.create({ title: 'Books', slug: 'books', last_scraped_at: null });
    await navRepo.save(nav);
  }

  let cat = await categoryRepo.findOne({ where: { slug: 'books' } });
  if (!cat) {
    cat = categoryRepo.create({ title: 'Books', slug: 'books', navigation_id: nav.id, parent_id: null, product_count: 0, last_scraped_at: null });
    await categoryRepo.save(cat);
  }

  const existing = await productRepo.count();
  if (existing === 0) {
    const sample = Array.from({ length: 40 }).map((_, idx) =>
      productRepo.create({
        source_id: `demo-${idx + 1}`,
        title: `Sample Book ${idx + 1}`,
        author: `Author ${String.fromCharCode(65 + (idx % 26))}`,
        price: String(((idx % 10) + 1) * 10),
        currency: 'GBP',
        image_url: null,
        source_url: `https://example.com/books/${idx + 1}`,
        category_id: cat.id,
        last_scraped_at: null,
      }),
    );
    await productRepo.save(sample);
    await categoryRepo.update({ id: cat.id }, { product_count: sample.length });
  }

  console.log('Seed complete');
  await dataSource.destroy();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});



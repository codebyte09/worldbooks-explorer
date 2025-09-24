import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './category.entity';
import { ProductDetail } from './product_detail.entity';
import { Review } from './review.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  source_id: string;

  @Column({ type: 'varchar', length: 512 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  author: string | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  price: string | null;

  @Column({ type: 'varchar', length: 8, default: 'GBP' })
  currency: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  image_url: string | null;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 1024 })
  source_url: string;

  @Column({ type: 'timestamptz', nullable: true })
  last_scraped_at: Date | null;

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category | null;

  @Column({ type: 'int', nullable: true })
  category_id: number | null;

  @OneToOne(() => ProductDetail, (detail) => detail.product)
  detail: ProductDetail;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}




import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'product_detail' })
export class ProductDetail {
  @PrimaryColumn({ type: 'int' })
  product_id: number;

  @OneToOne(() => Product, (product) => product.detail, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'jsonb', nullable: true })
  specs: Record<string, unknown> | null;

  @Column({ type: 'numeric', precision: 3, scale: 2, nullable: true })
  ratings_avg: string | null;

  @Column({ type: 'int', nullable: true })
  reviews_count: number | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}




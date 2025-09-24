import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Navigation } from './navigation.entity';
import { Product } from './product.entity';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Navigation, (nav) => nav.categories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'navigation_id' })
  navigation: Navigation;

  @Column({ type: 'int' })
  navigation_id: number;

  @ManyToOne(() => Category, (cat) => cat.children, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parent_id' })
  parent: Category | null;

  @Column({ type: 'int', nullable: true })
  parent_id: number | null;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'int', default: 0 })
  product_count: number;

  @Column({ type: 'timestamptz', nullable: true })
  last_scraped_at: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => Category, (cat) => cat.parent)
  children: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}




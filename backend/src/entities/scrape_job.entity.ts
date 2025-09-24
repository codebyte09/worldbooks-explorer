import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'scrape_job' })
export class ScrapeJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1024 })
  target_url: string;

  @Column({ type: 'varchar', length: 64 })
  target_type: string;

  @Column({ type: 'varchar', length: 32, default: 'pending' })
  status: string;

  @Column({ type: 'timestamptz', nullable: true })
  started_at: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  finished_at: Date | null;

  @Column({ type: 'text', nullable: true })
  error_log: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}




import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'view_history' })
export class ViewHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, nullable: true })
  user_id: string | null;

  @Column({ type: 'varchar', length: 128 })
  session_id: string;

  @Column({ type: 'jsonb' })
  path_json: unknown;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}








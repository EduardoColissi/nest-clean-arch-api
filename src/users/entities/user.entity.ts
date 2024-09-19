import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import crypto from 'crypto';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  constructor(
    props: {
      name: string;
      email: string;
      created_at?: Date;
      updated_at?: Date;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }
}

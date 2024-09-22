import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import crypto from 'crypto';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column()
  password: string;
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
      password: string;
      created_at?: Date;
      updated_at?: Date;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
    this.password = this.createHash(this.password);
  }

  createHash(password: string): string {
    return crypto
      .createHash('sha256')
      .update(password ?? '')
      .digest('hex');
  }
}

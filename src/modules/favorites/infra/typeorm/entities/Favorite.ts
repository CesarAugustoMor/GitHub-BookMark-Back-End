import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Expose } from 'class-transformer';
// import uploadConfig from '@config/upload';
// import User from '@modules/users/infra/typeorm/entities/User';

@Entity('favorites')
export default class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column()
  nickname: string;

  @Column()
  avatar_github: string;

  // @OneToMany(() => User, post => post.tags /* , { eager: true } */)
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

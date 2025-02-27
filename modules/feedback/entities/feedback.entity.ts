import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntityWithDatesAndIdColumns } from '@/resources/base.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';

export enum Initiator {
  employee = 'employee',
  administration = 'administration',
}

@Entity('feedback')
export class FeedbackEntity extends BaseEntityWithDatesAndIdColumns {
  @Column({ type: 'text' })
  feedback: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'enum', enum: Initiator, enumName: 'initiator_enum' })
  initiator: Initiator;

  @Column({ name: 'is_promotion' })
  isPromotion: boolean;

  @Column({ name: 'admin' })
  isAdmin: boolean;

  @ManyToOne(() => UserEntity, (entity) => entity.feedback)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity.feedback)
  @JoinColumn()
  feedbacker: UserEntity;
}

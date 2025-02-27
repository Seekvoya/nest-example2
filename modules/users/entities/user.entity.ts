import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntityWithDatesAndIdColumns } from '@/resources/base.entity';
import { FeedbackEntity } from '@/modules/feedback/entities/feedback.entity';

export enum Roles {
  BACK = 'backend',
  FRONT = 'frontend',
  CFO = 'CFO',
  OWNER = 'owner',
  MANAGER = 'manager',
  QA = 'q/a',
  DEVOPS = 'devops',
  DESIGN = 'design',
  REACT_NATIVE = 'react native',
  ANDROID = 'android',
}

@Entity('users')
export class UserEntity extends BaseEntityWithDatesAndIdColumns {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'middle_name', nullable: true })
  middleName: string;

  @Column({ type: 'enum', enum: Roles, enumName: 'roles_enum' })
  role: Roles;

  @Column()
  telegram: string;

  @Column({ default: false, name: 'admin' })
  isAdmin: boolean;

  @Column({ default: false, name: 'archived' })
  isArchived: boolean;

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.user)
  feedback: FeedbackEntity[];

  @Column({ name: 'recovery_hash', nullable: true, type: 'uuid' })
  recoveryHash: string | null;
}

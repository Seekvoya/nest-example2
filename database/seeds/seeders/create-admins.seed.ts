/* eslint-disable no-console */
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { logWithScoup } from '@/database/seeds/utils';
import { Roles, UserEntity } from '@/modules/users/entities/user.entity';
import { Passworder } from '@/lib/Passworder';

type BaseEntityFields =
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'recoveryHash'
  | 'hasId'
  | 'save'
  | 'remove'
  | 'softRemove'
  | 'recover'
  | 'reload';

type UserEntityOptionalFields =
  | BaseEntityFields
  | 'recoveryHash'
  | 'isArchived'
  | 'feedback'
  | 'reminders';

const defaultAdminAccounts: Omit<UserEntity, UserEntityOptionalFields>[] = [
  {
    lastName: 'Дефолтный',
    firstName: 'Админ',
    middleName: '',

    isAdmin: true,
    role: Roles.OWNER,

    telegram: '@wrath52',
    password: '12345678',
    email: 'kalianov@vvdev.ru',
  },
];

const separator = '\n- ';

export default class AdminsSeeder implements Seeder {
  public async run(dataSource: DataSource) {
    const repository = dataSource.getRepository(UserEntity);

    const addedUsers: UserEntity[] = [];

    for (const admin of defaultAdminAccounts) {
      const entity: UserEntity = repository.create({
        ...admin,
        password: await Passworder.hashPassword(admin.password),
      });
      const result = await repository
        .createQueryBuilder()
        .insert()
        .values(entity)
        .orIgnore()
        .execute();

      if (result.identifiers[0]) addedUsers.push(entity);
    }

    if (addedUsers.length) {
      logWithScoup(AdminsSeeder.name, 'Added records:');

      addedUsers.forEach((a) => {
        const data = [a.email];
        logWithScoup(AdminsSeeder.name, data.join(separator), '', ' -');
      });

      if (addedUsers.length === defaultAdminAccounts.length) {
        logWithScoup(AdminsSeeder.name, 'All records have been successfully added to the database');
      } else {
        logWithScoup(AdminsSeeder.name, 'Records have been partially added to the database');
      }
    } else {
      logWithScoup(AdminsSeeder.name, 'No new entries have been added to the database');
    }
  }
}

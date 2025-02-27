/* eslint-disable no-console */
import { connectionSource } from '@/config/ormconfig';
import { runSeederWithLogs } from '@/database/seeds/utils';
import AdminsSeeder from '@/database/seeds/seeders/create-admins.seed';

export const runSeeds = async (scope: 'launch' | 'script') => {
  console.log('\nStart seeds...');

  try {
    const source = await connectionSource.initialize();

    if (scope === 'launch') {
      await runSeederWithLogs(source, AdminsSeeder);
    }

    if (scope === 'script') {
      await runSeederWithLogs(source, AdminsSeeder);
    }

    console.log('\nSeeds completed successfully');
  } catch (error) {
    console.log('\nSeeds starting error');
    console.log(error);
  } finally {
    console.log('');
  }
};

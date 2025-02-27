/* eslint-disable no-console */
import { runSeeder } from 'typeorm-extension';

export const logWithScoup = (
  scoup: string,
  message: string,
  inputSeparator: boolean | string = '',
  prefix?: string,
) => {
  const separator = typeof inputSeparator === 'boolean' ? '\n' : inputSeparator;
  console.log(`${separator}[${scoup}] ${[prefix, message].join(' ')}`);
};

export const runSeederWithLogs: typeof runSeeder = async (source, seeder): Promise<undefined> => {
  const scoup = typeof seeder !== 'string' ? seeder.name : 'No scoup';

  logWithScoup(scoup, 'Seed generation begins...', true);
  await runSeeder(source, seeder);
  logWithScoup(scoup, 'Seed creation completed successfully!');
};

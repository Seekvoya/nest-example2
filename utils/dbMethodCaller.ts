import { AppExceptions } from '@/exceptions/app';
import { DeleteResult, UpdateResult } from 'typeorm';

export const callDbMethodOrError = async (
  method: Promise<DeleteResult | UpdateResult>,
  notFoundError: () => void,
): Promise<void> => {
  try {
    const { affected } = await method;

    if (!affected) {
      notFoundError();
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    AppExceptions.InternalError;
  }
};

import { Request } from 'express';

export const getAccessToken = (req: Request): string | string[] | undefined => {
  const headerToken = req.headers?.['x-access-token'];
  const cookieToken = req.cookies?.['accessToken'];

  return headerToken || cookieToken;
};

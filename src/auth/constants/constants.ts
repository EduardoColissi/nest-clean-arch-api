import { SetMetadata } from '@nestjs/common';
export const jwtConstants = {
  secret: 'FAKE VALUE, PLEASE CHANGE TO A ENVIROMENT VARIABLE',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

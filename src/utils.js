import { readFileSync } from 'fs';

export const getFileExtension = (path) => {
  const splittedPath = path.split('.');
  return splittedPath[splittedPath.length - 1];
};
export const readFromFile = (path) => readFileSync(path, 'utf-8');

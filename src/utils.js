import { readFileSync } from 'fs';

export const getFileExtension = (path) => path.split('.').pop();
export const readFromFile = (path) => readFileSync(path, 'utf-8');

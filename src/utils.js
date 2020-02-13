import { readFileSync } from 'fs';

export const getFileType = (path) => path.split('.').pop();
export const readFromFile = (path) => readFileSync(path, 'utf-8');

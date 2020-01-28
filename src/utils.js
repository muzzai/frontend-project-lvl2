import { readFileSync } from 'fs';

export default (path) => JSON.parse(readFileSync(path, 'utf8'));

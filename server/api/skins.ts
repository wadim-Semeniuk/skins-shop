import { readFileSync } from 'fs';
import { join } from 'path';

export default defineEventHandler(() => {
  const dataPath = join(process.cwd(), 'server/api/skins.json')
  return JSON.parse(readFileSync(dataPath, 'utf8'));
})

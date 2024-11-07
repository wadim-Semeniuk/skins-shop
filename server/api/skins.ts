import { readFileSync } from 'fs';
import { join } from 'path';

export default defineEventHandler(() => (
  JSON.parse(readFileSync(join(process.cwd(), 'server/api/data/skins.json'), 'utf8'))
));

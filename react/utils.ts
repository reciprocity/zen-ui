import * as path from 'path';
import { promises as fs } from 'fs';

type UpdateFileCb = (contents: string) => Promise<string>;
// Opens a file, updates it and saves it.
export const updateFile = async (filepath: string, fn: UpdateFileCb) => {
  const contents = await fs.readFile(filepath, 'utf-8');
  const updatedContents = await fn(contents);
  await fs.writeFile(filepath, updatedContents);
};
// Prefixes all paths on a dictionary.
export const prefixPaths = <T extends { [key: string]: string }>(prefix: string, paths: T): T =>
  Object.entries(paths).reduce((acc, [key, value]) => ({ ...acc, [key]: path.join(prefix, value) }), paths);

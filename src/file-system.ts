import { promises as fs } from 'fs';

/**
 * Provides access to the necessary file system primitives.
 */
export type FileSystem = {
  /**
   * An asyncrhonous method to write files.
   */
  writeFile: typeof fs.writeFile;
};

/**
 * A standard implementation of `FileSystem` that uses the `node` standard library.
 */
export const StandardFileSystem: FileSystem = fs;

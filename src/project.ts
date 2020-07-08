import { Construct, Node } from 'constructs';
import { createPrinter, NewLineKind, Printer } from 'typescript';
import { FileSystem, StandardFileSystem } from './file-system';

export class Project extends Construct {
  public constructor() {
    super((null as unknown) as Construct, '');
  }

  /**
   * Synthesizes this `Project` into the desired directory.
   *
   * @param outdir the directory where to output synthesized source.
   */
  public synthesize(
    outdir: string,
    fs: FileSystem = StandardFileSystem,
    printer: Printer = createPrinter({
      newLine: NewLineKind.LineFeed,
      noEmitHelpers: true,
      omitTrailingSemicolon: false,
      removeComments: false,
    }),
  ): void {
    Node.of(this).synthesize({ outdir, sessionContext: { fs, printer } });
  }
}

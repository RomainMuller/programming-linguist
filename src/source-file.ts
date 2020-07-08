import { Construct, ISynthesisSession, Node } from 'constructs';
import { join } from 'path';
import { createSourceFile, updateSourceFileNode, Printer, ScriptKind, ScriptTarget } from 'typescript';
import { FileSystem } from './file-system';
import { Statement } from './private/statement';
import { Project } from './project';

export interface SourceFileProps {
  readonly fileName?: string;
}

export class SourceFile extends Construct {
  public readonly fileName: string;

  public constructor(scope: Project, id: string, props: SourceFileProps = {}) {
    super(scope, id);

    this.fileName = props.fileName ?? `${Node.of(this).uniqueId}.ts`;
  }

  protected onSynthesize(session: ISynthesisSession): void {
    const fileName = join(session.outdir, this.fileName);

    const sourceFile = updateSourceFileNode(
      createSourceFile(fileName, '', ScriptTarget.Latest, true, ScriptKind.TS),
      Node.of(this)
        .children.map(Statement.requireStatement)
        .map((stmt) => stmt.render()),
    );

    const printer: Printer = session['printer'];
    const data = printer.printFile(sourceFile);

    const fs: FileSystem = session['fs'];
    fs.writeFile(fileName, data, { encoding: 'utf-8' });
  }
}

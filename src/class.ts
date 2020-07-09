import {
  createModifier,
  ClassDeclaration,
  createClassDeclaration,
  Modifier,
  HeritageClause,
  createHeritageClause,
  SyntaxKind,
  createExpressionWithTypeArguments,
} from 'typescript';

import { Identifier } from './identifier';
import { IDocumentable, documentable } from './private/documentable';
import { Statement } from './private/statement';
import { SourceFile } from './source-file';
import { IInterface } from './interface';

export interface ClassProps {
  readonly abstract?: boolean;
  readonly base?: IClass;
  readonly documentation?: string;
  readonly exported?: boolean;
  readonly interfaces?: readonly IInterface[];
  readonly name?: string | Identifier;
}

export class Class extends Statement implements IClass {
  public readonly abstract: boolean;
  public readonly base?: IClass;
  public readonly documentation?: string;
  public readonly exported: boolean;
  public readonly interfaces: readonly IInterface[];
  public readonly name: Identifier;

  public constructor(scope: SourceFile, id: string, props: ClassProps) {
    super(scope, id);

    this.abstract = props.abstract ?? false;
    this.base = props.base;
    this.documentation = props.documentation;
    this.exported = props.exported ?? false;
    this.interfaces = props.interfaces ?? [];
    this.name = props.name ? Identifier.from(props.name) : Identifier.createUnique(id);
  }

  /** @internal */
  @documentable
  public render(): ClassDeclaration {
    return createClassDeclaration(
      undefined,
      this.modifiers,
      this.name.node,
      undefined,
      this.heritageClauses,
      this.members,
    );
  }

  private get heritageClauses() {
    const clauses = new Array<HeritageClause>();

    if (this.base) {
      clauses.push(
        createHeritageClause(SyntaxKind.ExtendsKeyword, [
          createExpressionWithTypeArguments(undefined, this.base.name.node),
        ]),
      );
    }

    if (this.interfaces.length > 0) {
      clauses.push(
        createHeritageClause(
          SyntaxKind.ImplementsKeyword,
          this.interfaces.map((iface) => createExpressionWithTypeArguments(undefined, iface.name.node)),
        ),
      );
    }

    return clauses;
  }

  private get members() {
    return [];
  }

  private get modifiers() {
    const result = new Array<Modifier['kind']>();

    if (this.abstract) {
      result.push(SyntaxKind.AbstractKeyword);
    }

    if (this.exported) {
      result.push(SyntaxKind.ExportKeyword);
    }

    return result.map(createModifier);
  }
}

export interface IClass extends IDocumentable {
  readonly abstract: boolean;
  readonly base?: IClass;
  readonly exported: boolean;
  readonly interfaces: readonly IInterface[];
  readonly name: Identifier;
}

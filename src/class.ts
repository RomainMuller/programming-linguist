import { ClassDeclaration, Modifier, HeritageClause, SyntaxKind, NodeFactory } from 'typescript';

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
  public render(factory: NodeFactory): ClassDeclaration {
    return factory.createClassDeclaration(
      undefined,
      this.modifiers(factory),
      this.name.node(factory),
      undefined,
      this.heritageClauses(factory),
      this.members(),
    );
  }

  private heritageClauses(factory: NodeFactory) {
    const clauses = new Array<HeritageClause>();

    if (this.base) {
      clauses.push(
        factory.createHeritageClause(SyntaxKind.ExtendsKeyword, [
          factory.createExpressionWithTypeArguments(this.base.name.node(factory), undefined),
        ]),
      );
    }

    if (this.interfaces.length > 0) {
      clauses.push(
        factory.createHeritageClause(
          SyntaxKind.ImplementsKeyword,
          this.interfaces.map((iface) =>
            factory.createExpressionWithTypeArguments(iface.name.node(factory), undefined),
          ),
        ),
      );
    }

    return clauses;
  }

  private members() {
    return [];
  }

  private modifiers(factory: NodeFactory) {
    const result = new Array<Modifier['kind']>();

    if (this.abstract) {
      result.push(SyntaxKind.AbstractKeyword);
    }

    if (this.exported) {
      result.push(SyntaxKind.ExportKeyword);
    }

    return result.map(factory.createModifier.bind(factory));
  }
}

export interface IClass extends IDocumentable {
  readonly abstract: boolean;
  readonly base?: IClass;
  readonly exported: boolean;
  readonly interfaces: readonly IInterface[];
  readonly name: Identifier;
}

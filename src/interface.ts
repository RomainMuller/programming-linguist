import {
  createExpressionWithTypeArguments,
  createInterfaceDeclaration,
  createHeritageClause,
  createModifier,
  Modifier,
  Statement as TypeScriptStatement,
  SyntaxKind,
} from 'typescript';

import { documentable, IDocumentable } from './documentable';
import { Identifier } from './identifier';
import { Statement } from './private/statement';
import { SourceFile } from './source-file';

export interface InterfaceProps {
  readonly documentation?: string;
  readonly exported?: boolean;
  readonly extends?: readonly IInterface[];
  readonly name?: string | Identifier;
}

export class Interface extends Statement implements IInterface {
  public readonly exported: boolean;
  public readonly extends: readonly IInterface[];
  public readonly name: Identifier;

  public readonly documentation?: string;

  public constructor(scope: SourceFile, id: string, props: InterfaceProps) {
    super(scope, id);

    this.documentation = props.documentation;
    this.exported = props.exported ?? false;
    this.extends = props.extends ?? [];
    this.name = props.name ? Identifier.from(props.name) : Identifier.uniqueIdentifier(id);
  }

  /** @internal */
  @documentable
  public render(): TypeScriptStatement {
    return createInterfaceDeclaration(
      undefined, // decorators
      this.modifiers,
      this.name.node,
      undefined, // typeParameters
      this.heritageClauses, // heritageClauses
      [], // members
    );
  }

  private get heritageClauses() {
    if (this.extends.length == 0) {
      return undefined;
    }
    return [
      createHeritageClause(
        SyntaxKind.ExtendsKeyword,
        this.extends.map((base) => createExpressionWithTypeArguments(undefined, base.name.node)),
      ),
    ];
  }

  private get modifiers() {
    const tokens = new Array<Modifier['kind']>();

    if (this.exported) {
      tokens.push(SyntaxKind.ExportKeyword);
    }

    return tokens.map(createModifier);
  }
}

export interface IInterface extends IDocumentable {
  readonly exported: boolean;
  readonly extends: readonly IInterface[];
  readonly name: Identifier;
}

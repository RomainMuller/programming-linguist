import { Node } from 'constructs';
import { Modifier, NodeFactory, Statement as TypeScriptStatement, SyntaxKind, TypeReferenceNode } from 'typescript';

import { documentable, IDocumentable } from './private/documentable';
import { Identifier } from './identifier';
import { Statement } from './private/statement';
import { SourceFile } from './source-file';
import { IType } from './private/type';
import { TypeElement } from './private/type-member';

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
    this.name = props.name ? Identifier.from(props.name) : Identifier.createUnique(id);
  }

  /** @internal */
  public node(factory: NodeFactory): TypeReferenceNode {
    return factory.createTypeReferenceNode(this.name.node(factory), undefined);
  }

  /** @internal */
  @documentable
  public render(factory: NodeFactory): TypeScriptStatement {
    return factory.createInterfaceDeclaration(
      undefined, // decorators
      this.modifiers(factory),
      this.name.node(factory),
      undefined, // typeParameters
      this.heritageClauses(factory),
      this.members(factory),
    );
  }

  private heritageClauses(factory: NodeFactory) {
    if (this.extends.length == 0) {
      return undefined;
    }
    return [
      factory.createHeritageClause(
        SyntaxKind.ExtendsKeyword,
        this.extends.map((base) => factory.createExpressionWithTypeArguments(base.name.node(factory), undefined)),
      ),
    ];
  }

  private members(factory: NodeFactory) {
    return Node.of(this)
      .children.map(TypeElement.requireTypeElement)
      .map((elt) => elt.render(factory));
  }

  private modifiers(factory: NodeFactory) {
    const tokens = new Array<Modifier['kind']>();

    if (this.exported) {
      tokens.push(SyntaxKind.ExportKeyword);
    }

    return tokens.map(factory.createModifier.bind(factory));
  }
}

export interface IInterface extends IDocumentable, IType {
  readonly exported: boolean;
  readonly extends: readonly IInterface[];
  readonly name: Identifier;
}

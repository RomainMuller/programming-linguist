import { ParameterDeclaration, SyntaxKind, NodeFactory } from 'typescript';

import { Identifier } from './identifier';
import { IType } from './private/type';

export interface ParameterProps {
  readonly name?: string | Identifier;
  readonly optional?: boolean;
  readonly type: IType;
}

export class Parameter implements IParameter {
  public readonly name: Identifier;
  public readonly optional: boolean;
  public readonly type: IType;

  public constructor(props: ParameterProps) {
    this.name = props.name ? Identifier.from(props.name) : Identifier.createUnique('param');
    this.optional = props.optional ?? false;
    this.type = props.type;
  }

  /** @internal */
  public render(factory: NodeFactory, { variadic }: { readonly variadic: boolean }): ParameterDeclaration {
    return factory.createParameterDeclaration(
      undefined,
      [],
      variadic ? factory.createToken(SyntaxKind.DotDotDotToken) : undefined,
      this.name.node(factory),
      this.optional ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
      this.type.node(factory),
    );
  }
}

export interface IParameter {
  readonly name: Identifier;
  readonly optional: boolean;
  readonly type: IType;

  /** @internal */
  render(factory: NodeFactory, opts: { readonly variadic: boolean }): ParameterDeclaration;
}

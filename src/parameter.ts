import { createParameter, ParameterDeclaration, createToken, SyntaxKind, Modifier } from 'typescript';

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
  public render({ variadic }: { readonly variadic: boolean }): ParameterDeclaration {
    return createParameter(
      undefined,
      this.modifiers,
      variadic ? createToken(SyntaxKind.DotDotDotToken) : undefined,
      this.name.node,
      this.optional ? createToken(SyntaxKind.QuestionToken) : undefined,
      this.type.node,
      undefined,
    );
  }

  /** @internal */
  protected get modifiers(): Modifier[] {
    return [];
  }
}

export interface IParameter {
  readonly name: Identifier;
  readonly optional: boolean;
  readonly type: IType;

  /** @internal */
  render(opts: { readonly variadic: boolean }): ParameterDeclaration;
}

import {
  createModifier,
  createPropertySignature,
  createToken,
  Modifier,
  PropertySignature as TypeScriptPropertySignature,
  SyntaxKind,
} from 'typescript';

import { Identifier } from './identifier';
import { Interface } from './interface';
import { IDocumentable, documentable } from './private/documentable';
import { TypeElement } from './private/type-member';
import { IType } from './private/type';

export interface PropertySignatureProps {
  readonly documentation?: string;
  readonly name?: string | Identifier;
  readonly optional?: boolean;
  readonly readonly?: boolean;
  readonly type: IType;
}

export class PropertySignature extends TypeElement implements IDocumentable {
  public readonly documentation?: string;
  public readonly name: Identifier;
  public readonly optional: boolean;
  public readonly readonly: boolean;
  public readonly type: IType;

  public constructor(scope: Interface, id: string, props: PropertySignatureProps) {
    super(scope, id);

    this.documentation = props.documentation;
    this.name = props.name ? Identifier.from(props.name) : Identifier.createUnique(id);
    this.optional = props.optional ?? false;
    this.readonly = props.readonly ?? false;
    this.type = props.type;
  }

  /** @internal */
  @documentable
  public render(): TypeScriptPropertySignature {
    return createPropertySignature(
      this.modifiers,
      this.name.node,
      this.optional ? createToken(SyntaxKind.QuestionToken) : undefined,
      this.type.node,
      undefined,
    );
  }

  private get modifiers() {
    const result = new Array<Modifier['kind']>();

    if (this.readonly) {
      result.push(SyntaxKind.ReadonlyKeyword);
    }

    return result.map(createModifier);
  }
}

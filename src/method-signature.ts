import { createMethodSignature, MethodSignature as TypeScriptMethodSignature } from 'typescript';

import { ArrayType } from './array-type';
import { Interface } from './interface';
import { Identifier } from './identifier';
import { IParameter } from './parameter';
import { PrimitiveType } from './primitive-type';
import { IDocumentable, documentable } from './private/documentable';
import { IType } from './private/type';
import { TypeElement } from './private/type-member';

export interface MethodSignatureProps {
  readonly documentation?: string;
  readonly name?: string | Identifier;
  readonly returnType?: IType;
  readonly parameters?: readonly IParameter[];
  readonly variadic?: boolean;
}

export class MethodSignature extends TypeElement implements IDocumentable {
  public readonly documentation?: string;
  public readonly name: Identifier;
  public readonly returnType: IType;
  public readonly parameters: readonly IParameter[];
  public readonly variadic: boolean;

  public constructor(scope: Interface, id: string, props: MethodSignatureProps) {
    super(scope, id);

    if (props.variadic) {
      if (props.parameters == null || props.parameters.length === 0) {
        throw new Error(`A variadic method must accept at least one parameter`);
      }
      if (!ArrayType.isArray(props.parameters[props.parameters.length - 1].type)) {
        throw new Error(`The last parameter to a variadic method must be an array type`);
      }
    }

    this.documentation = props.documentation;
    this.name = props.name ? Identifier.from(props.name) : Identifier.createUnique(id);
    this.parameters = props.parameters ?? [];
    this.returnType = props.returnType ?? PrimitiveType.VOID;
    this.variadic = props.variadic ?? false;
  }

  /** @internal */
  @documentable
  public render(): TypeScriptMethodSignature {
    return createMethodSignature(
      undefined,
      this.parameters.map((param, index) =>
        param.render({ variadic: index === this.parameters.length - 1 && this.variadic }),
      ),
      this.returnType.node,
      this.name.node,
      undefined,
    );
  }
}

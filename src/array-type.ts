import { createArrayTypeNode, createTypeOperatorNode, SyntaxKind, TypeNode, TypeOperatorNode } from 'typescript';

import { IType } from './private/type';

export interface ArrayTypeProps {
  readonly elementType: IType;
  readonly readonly?: boolean;
}

export class ArrayType implements IType {
  public static isArray(obj: IType): obj is ArrayType {
    return obj instanceof ArrayType;
  }

  public static of(elt: IType): ArrayType {
    return new ArrayType(elt);
  }

  protected constructor(public readonly elementType: IType) {}

  /** @internal */
  public get node(): TypeNode {
    return createArrayTypeNode(this.elementType.node);
  }
}

export class ReadonlyArrayType extends ArrayType {
  public static of(elt: IType): ReadonlyArrayType {
    return new ReadonlyArrayType(elt);
  }

  /** @internal */
  public get node(): TypeOperatorNode {
    return createTypeOperatorNode(SyntaxKind.ReadonlyKeyword, super.node);
  }
}

import { TypeNode } from 'typescript';

export interface IType {
  /** @internal */
  readonly node: TypeNode;
}

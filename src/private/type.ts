import { NodeFactory, TypeNode } from 'typescript';

export interface IType {
  /** @internal */
  node(factory: NodeFactory): TypeNode;
}

export type TypeNodeFactory = (factory: NodeFactory) => TypeNode;

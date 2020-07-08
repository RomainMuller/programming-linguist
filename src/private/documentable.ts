import { addSyntheticLeadingComment, Node, SyntaxKind } from 'typescript';

export interface IDocumentable {
  readonly documentation?: string;
}

/** @internal */
export function documentable(
  _target: IDocumentable,
  propertyKey: string,
  propertyDescriptor: PropertyDescriptor,
): void {
  if (propertyKey !== 'render') {
    throw new Error('Only the "render" method can be decorated with @documentable!');
  }
  if (typeof propertyDescriptor.value !== 'function') {
    throw new Error('Only a method can be decorated with @documentable!');
  }

  const original: (this: IDocumentable, ...args: unknown[]) => Node = propertyDescriptor.value;

  propertyDescriptor.value = function renderDocumented(this: IDocumentable, ...args: unknown[]): Node {
    const node = original.call(this, ...args);
    if (this.documentation) {
      return addSyntheticLeadingComment(node, SyntaxKind.MultiLineCommentTrivia, `* ${this.documentation} `, true);
    }
    return node;
  };
}

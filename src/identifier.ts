import { createIdentifier, createUniqueName, Identifier as TypeScriptIdentifier } from 'typescript';

export class Identifier {
  public static from(value: string | Identifier): Identifier {
    if (typeof value === 'string') {
      return new Identifier(createIdentifier(value));
    }
    return value;
  }

  public static createUnique(text: string): Identifier {
    return new Identifier(createUniqueName(text));
  }

  /** @internal */
  public readonly node: TypeScriptIdentifier;

  private constructor(node: TypeScriptIdentifier) {
    this.node = node;
  }
}

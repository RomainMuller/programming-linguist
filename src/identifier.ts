import { Identifier as TypeScriptIdentifier, NodeFactory } from 'typescript';

export class Identifier {
  public static from(value: string | Identifier): Identifier {
    if (typeof value === 'string') {
      return new Identifier((factory) => factory.createIdentifier(value));
    }
    return value;
  }

  public static createUnique(text: string): Identifier {
    return new Identifier((factory) => factory.createUniqueName(text));
  }

  readonly #identifierNodeFactory: IdentifierNodeFactory;
  #node?: TypeScriptIdentifier;

  private constructor(identifierNodeFactory: IdentifierNodeFactory) {
    this.#identifierNodeFactory = identifierNodeFactory;
  }

  /** @internal */
  public node(factory: NodeFactory): TypeScriptIdentifier {
    this.#node ??= this.#identifierNodeFactory(factory);
    return this.#node;
  }
}

type IdentifierNodeFactory = (factory: NodeFactory) => TypeScriptIdentifier;

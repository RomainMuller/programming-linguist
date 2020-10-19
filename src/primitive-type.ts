import { NodeFactory, SyntaxKind, TypeNode } from 'typescript';

import { IType, TypeNodeFactory } from './private/type';

export class PrimitiveType implements IType {
  public static readonly BIGINT = new PrimitiveType((factory) =>
    factory.createKeywordTypeNode(SyntaxKind.BigIntKeyword),
  );
  public static readonly BOOLEAN = new PrimitiveType((factory) =>
    factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword),
  );
  public static readonly NUMBER = new PrimitiveType((factory) =>
    factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
  );
  public static readonly OBJECT = new PrimitiveType((factory) =>
    factory.createKeywordTypeNode(SyntaxKind.ObjectKeyword),
  );
  public static readonly STRING = new PrimitiveType((factory) =>
    factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
  );
  public static readonly SYMBOL = new PrimitiveType((factory) =>
    factory.createKeywordTypeNode(SyntaxKind.SymbolKeyword),
  );

  public static readonly ANY = new PrimitiveType((factory) => factory.createKeywordTypeNode(SyntaxKind.AnyKeyword));
  public static readonly UNKNOWN = new PrimitiveType((factory) =>
    factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword),
  );

  public static readonly THIS = new PrimitiveType((factory) => factory.createThisTypeNode());

  public static readonly VOID = new PrimitiveType((factory) => factory.createKeywordTypeNode(SyntaxKind.VoidKeyword));
  public static readonly UNDEFINED = new PrimitiveType((factory) =>
    factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
  );
  public static readonly NULL = new PrimitiveType((factory) => factory.createLiteralTypeNode(factory.createNull()));
  public static readonly NEVER = new PrimitiveType((factory) => factory.createKeywordTypeNode(SyntaxKind.NeverKeyword));

  #typeNodeFactory: TypeNodeFactory;

  private constructor(typeNodeFactory: TypeNodeFactory) {
    this.#typeNodeFactory = typeNodeFactory;
  }

  public node(factory: NodeFactory): TypeNode {
    return this.#typeNodeFactory(factory);
  }
}

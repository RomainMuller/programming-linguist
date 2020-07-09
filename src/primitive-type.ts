import { createKeywordTypeNode, KeywordTypeNode, SyntaxKind } from 'typescript';

import { IType } from './private/type';

export class PrimitiveType implements IType {
  public static readonly BIGINT = new PrimitiveType(SyntaxKind.BigIntKeyword);
  public static readonly BOOLEAN = new PrimitiveType(SyntaxKind.BooleanKeyword);
  public static readonly NUMBER = new PrimitiveType(SyntaxKind.NumberKeyword);
  public static readonly OBJECT = new PrimitiveType(SyntaxKind.ObjectKeyword);
  public static readonly STRING = new PrimitiveType(SyntaxKind.StringKeyword);
  public static readonly SYMBOL = new PrimitiveType(SyntaxKind.SymbolKeyword);

  public static readonly ANY = new PrimitiveType(SyntaxKind.AnyKeyword);
  public static readonly UNKNOWN = new PrimitiveType(SyntaxKind.UnknownKeyword);

  public static readonly THIS = new PrimitiveType(SyntaxKind.ThisKeyword);

  public static readonly VOID = new PrimitiveType(SyntaxKind.VoidKeyword);
  public static readonly UNDEFINED = new PrimitiveType(SyntaxKind.UndefinedKeyword);
  public static readonly NULL = new PrimitiveType(SyntaxKind.NullKeyword);
  public static readonly NEVER = new PrimitiveType(SyntaxKind.NeverKeyword);

  /** @internal */
  public readonly node: KeywordTypeNode;

  private constructor(kind: KeywordTypeNode['kind']) {
    this.node = createKeywordTypeNode(kind);
  }
}

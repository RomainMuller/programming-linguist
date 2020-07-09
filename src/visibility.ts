import { SyntaxKind, Modifier, createModifier } from 'typescript';

export class Visibility {
  public static readonly PRIVATE = new Visibility(SyntaxKind.PrivateKeyword);
  public static readonly PROTECTED = new Visibility(SyntaxKind.ProtectedKeyword);
  public static readonly PUBLIC = new Visibility(SyntaxKind.PublicKeyword);

  public static readonly DEFAULT = new Visibility();

  private constructor(private readonly kind?: Modifier['kind']) {}

  /** @internal */
  public get node(): Modifier | undefined {
    return this.kind && createModifier(this.kind);
  }
}

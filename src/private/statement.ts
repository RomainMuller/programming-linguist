import { Construct, IConstruct } from 'constructs';
import type { SourceFile } from '../source-file';
import type { Statement as TypeScriptStatement } from 'typescript';

const STATEMENT_SYMBOL = Symbol.for('typescript-poet.Statement');

export abstract class Statement extends Construct {
  /** @internal */
  public static isStatement(obj: IConstruct): obj is Statement {
    return !!(obj as Statement)[STATEMENT_SYMBOL];
  }

  /** @internal */
  public static requireStatement(obj: IConstruct): Statement | never {
    if (!Statement.isStatement(obj)) {
      throw new Error(`Expected a ${Statement.name}, but got an insatnce of ${obj.constructor.name}`);
    }
    return obj;
  }

  private readonly [STATEMENT_SYMBOL]: boolean = true;

  /** @internal */
  public constructor(scope: SourceFile, id: string) {
    super(scope, id);
  }

  /** @internal */
  public abstract render(): TypeScriptStatement;
}

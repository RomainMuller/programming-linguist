import { Identifier } from '../identifier';

import { TypeElement as TypeScriptTypeElement } from 'typescript';
import { Construct, IConstruct } from 'constructs';

const TYPE_ELEMENT_SYMBOL = Symbol.for('programming-linguist.TypeElement');

export abstract class TypeElement extends Construct {
  /** @internal */
  public static isTypeElement(obj: IConstruct): obj is TypeElement {
    return !!(obj as TypeElement)[TYPE_ELEMENT_SYMBOL];
  }

  /** @internal */
  public static requireTypeElement(obj: IConstruct): TypeElement | never {
    if (!TypeElement.isTypeElement(obj)) {
      throw new Error(`Expected a ${TypeElement.name}, but got an insatnce of ${obj.constructor.name}`);
    }
    return obj;
  }

  /** @internal */
  private readonly [TYPE_ELEMENT_SYMBOL] = true;

  public abstract readonly name: Identifier;

  /** @internal */
  public abstract render(): TypeScriptTypeElement;
}

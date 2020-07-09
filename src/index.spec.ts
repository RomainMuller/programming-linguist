import {
  Class,
  FileSystem,
  Interface,
  MethodSignature,
  Parameter,
  PrimitiveType,
  Project,
  PropertySignature,
  ReadonlyArrayType,
  SourceFile,
} from './index';

const OUTDIR = '/this/is/my/outdir';
const MOCK_FS: FileSystem = {
  writeFile: jest.fn().mockName('fs.writeFile'),
};

test('synthesis', () => {
  // GIVEN
  const project = new Project();
  const sourceFile = new SourceFile(project, 'index');

  const foo = new Interface(sourceFile, 'Foo', {
    documentation: 'Look! It has documentation!',
    exported: true,
  });
  new PropertySignature(foo, 'property', {
    optional: true,
    readonly: true,
    type: PrimitiveType.UNKNOWN,
  });

  const bar = new Interface(sourceFile, 'Bar', {
    extends: [foo],
    name: 'Bar',
  });
  new MethodSignature(bar, 'method', {
    parameters: [new Parameter({ type: ReadonlyArrayType.of(PrimitiveType.NUMBER) })],
    variadic: true,
  });

  new Class(sourceFile, 'Baz', {
    abstract: true,
    documentation: 'Classy!',
    exported: true,
    interfaces: [foo, bar],
    name: 'Bazinga',
  });

  // WHEN
  expect(() => project.synthesize(OUTDIR, MOCK_FS)).not.toThrowError();

  // THEN
  expect(MOCK_FS.writeFile).toHaveBeenCalledTimes(1);
  expect((MOCK_FS.writeFile as jest.MockedFunction<typeof MOCK_FS.writeFile>).mock.calls[0].slice(0, 2))
    .toMatchInlineSnapshot(`
    Array [
      "/this/is/my/outdir/index.ts",
      "/** Look! It has documentation! */
    export interface Foo_1 {
        readonly property_1?: unknown;
    }
    interface Bar extends Foo_1 {
        method_1(...param_1: readonly number[]): void;
    }
    /** Classy! */
    abstract export class Bazinga implements Foo_1, Bar {
    }
    ",
    ]
  `);
});

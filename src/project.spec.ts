import { FileSystem } from './file-system';
import { Interface } from './interface';
import { Project } from './project';
import { SourceFile } from './source-file';

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
  new Interface(sourceFile, 'Bar', {
    extends: [foo],
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
    }
    interface Bar_1 extends Foo_1 {
    }
    ",
    ]
  `);
});

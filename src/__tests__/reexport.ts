import { getESLintTester } from "./fixtures/eslint";

const tester = getESLintTester();

describe("reexports", () => {
  it("Can import a re-exported variable", async () => {
    const result = await tester.lintFile("src/reexport/useFoo.ts");
    expect(result).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 18,
    "endColumn": 31,
    "endLine": 1,
    "line": 1,
    "message": "Cannot import a private export 'subFooPrivate'",
    "messageId": "private",
    "nodeType": "ImportSpecifier",
    "ruleId": "import-access/jsdoc",
    "severity": 2,
  },
]
`);
  });
  it("Can import a re-exported value (export from)", async () => {
    const result = await tester.lintFile("src/reexport/useBar.ts");
    expect(result).toEqual([]);
  });
  it("Can import a re-exported private variable (export from)", async () => {
    const result = await tester.lintFile("src/reexport/useBaz.ts");
    expect(result).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 10,
    "endColumn": 16,
    "endLine": 1,
    "line": 1,
    "message": "Cannot import a private export 'subBaz'",
    "messageId": "private",
    "nodeType": "ImportSpecifier",
    "ruleId": "import-access/jsdoc",
    "severity": 2,
  },
]
`);
  });
  describe("indexLoophole = false", () => {
    it("Cannot import a package-private variable from sub/index.ts", async () => {
      const result = await tester.lintFile("src/reexport/useFoo.ts", {
        jsdoc: {
          indexLoophole: false,
        },
      });
      expect(result).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 18,
    "endColumn": 31,
    "endLine": 1,
    "line": 1,
    "message": "Cannot import a private export 'subFooPrivate'",
    "messageId": "private",
    "nodeType": "ImportSpecifier",
    "ruleId": "import-access/jsdoc",
    "severity": 2,
  },
]
`);
    });
  });
});

import { Parser } from "./parser";
describe("Parser", () => {
  let parser: Parser;

  beforeEach(() => {
    parser = new Parser();
  });

  test("When read hello.txt, it should return hello-world", () => {
    const fileContent = parser.readTextFile("../test/hello.txt");
    expect(fileContent).toEqual("hello-world");
  });

  test("When read mapWithIgnore.txt, it should return 5 lines", () => {
    const fileContent = parser.readTextFile("../test/mapWithIgnore.txt");
    const lineList = parser.splitFile(fileContent);

    expect(lineList.length).toEqual(5);
  });
});

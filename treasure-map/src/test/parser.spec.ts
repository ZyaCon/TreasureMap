import path from "path";

import { Parser } from "../parser/parser";
describe("Parser", () => {
  let parser: Parser;

  beforeEach(() => {
    parser = new Parser();
  });

  test("When read hello.txt, it should return hello-world", () => {
    const filePath = path.join(__dirname, "map", "hello.txt");

    const fileContent = parser.readTextFile(filePath);
    expect(fileContent).toEqual("hello-world");
  });

  test("When read mapWithIgnore.txt, it should return 5 lines", () => {
    const filePath = path.join(__dirname, "map", "mapWithIgnore.txt");
    const fileContent = parser.readTextFile(filePath);
    const lineList = parser.splitFile(fileContent);

    expect(lineList.length).toEqual(5);
  });
});

import { Parser } from "./parser";
describe("Parser", () => {
  let parser: Parser;

  beforeEach(() => {
    parser = new Parser();
  });

  test("When read hello.txt, it should return hello-world", () => {
    const fileContent = parser.readTextFile("./test/hello.txt");
    expect(fileContent).toEqual("hello-world");
  });

  test("When read mapWithIgnore.txt, it should return 5 lines", () => {
    const fileContent = parser.readTextFile("./test/mapWithIgnore.txt");
    const lineList = parser.splitFile(fileContent);

    expect(lineList.length).toEqual(5);
  });

  test("When create map with size 2x2 with nothing, should return empty map of 2x2", () => {
    const fileContent = parser.readTextFile("./test/map2x2.txt");
    const lineList = parser.splitFile(fileContent);
    const map = parser.createMap(lineList);

    const emptyMap = [
      [".", "."],
      [".", "."],
    ];

    expect(map).toEqual(emptyMap);
  });

  test("When create map with size 3x2 M at 1-1, should return map with M at 1-1", () => {
    const fileContent = parser.readTextFile("./test/map3x2_M.txt");
    const lineList = parser.splitFile(fileContent);
    const map = parser.createMap(lineList);

    const emptyMap = [
      [".", ".", "."],
      [".", "M", "."],
    ];

    expect(map).toEqual(emptyMap);
  });

  test("When create map with size 3x2 T at 1-1, should return map with T at 1-1", () => {
    const fileContent = parser.readTextFile("./test/map3x2_M_T.txt");
    const lineList = parser.splitFile(fileContent);
    const map = parser.createMap(lineList);

    const emptyMap = [
      [".", ".", "."],
      [".", "M", "T(1)"],
    ];

    expect(map).toEqual(emptyMap);
  });
});

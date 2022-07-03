import { Map } from "./map";
import { Parser } from "../parser/parser";
describe("Map", () => {
  let parser: Parser;
  let map: Map;

  beforeEach(() => {
    parser = new Parser();
    map = new Map();
  });

  test("When create map with size 2x2 with nothing, should return empty map of 2x2", () => {
    const fileContent = parser.readTextFile("../test/map2x2.txt");
    const lineList = parser.splitFile(fileContent);
    const newMap = map.createMap(lineList);

    const emptyMap = [
      [".", "."],
      [".", "."],
    ];

    expect(newMap).toEqual(emptyMap);
  });

  test("When create map with size 3x2 M at 1-1, should return map with M at 1-1", () => {
    const fileContent = parser.readTextFile("../test/map3x2_M.txt");
    const lineList = parser.splitFile(fileContent);
    const newMap = map.createMap(lineList);

    const tmpMap = [
      [".", ".", "."],
      [".", "M", "."],
    ];

    expect(newMap).toEqual(tmpMap);
  });

  test("When create map with size 3x2 T(1) at 1-1, should return map with T(1) at 1-1", () => {
    const fileContent = parser.readTextFile("../test/map3x2_M_T.txt");
    const lineList = parser.splitFile(fileContent);
    const newMap = map.createMap(lineList);

    const tmpMap = [
      [".", ".", "."],
      [".", "M", "T(1)"],
    ];

    expect(newMap).toEqual(tmpMap);
  });

  test("When create map with size 3x2 A at 0-1, should return map with A at 0-1", () => {
    const fileContent = parser.readTextFile("../test/map2.txt");
    const lineList = parser.splitFile(fileContent);
    const newMap = map.createMap(lineList);

    const tmpMap = [
      [".", ".", "."],
      ["A", ".", "."],
      [".", ".", "."],
      [".", ".", "."],
    ];

    expect(newMap).toEqual(tmpMap);
  });

  test("When create map A, should return A's data", () => {
    const fileContent = parser.readTextFile("../test/map2.txt");
    const lineList = parser.splitFile(fileContent);
    const newMap = map.createMap(lineList);

    const tmpMap = [
      [".", ".", "."],
      ["A", ".", "."],
      [".", ".", "."],
      [".", ".", "."],
    ];

    expect(newMap).toEqual(tmpMap);
  });
});

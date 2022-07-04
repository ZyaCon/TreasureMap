import path from "path";

import { MapTreasure } from "../map/map";
import { Parser } from "../parser/parser";
import { A } from "../adventurer/adventurer";

describe("Map", () => {
  let parser: Parser;
  let mapTreasure: MapTreasure;
  let adventurer: A;
  let basePath: string;

  const mockMap = (mapPath: string) => {
    const filePath = path.join(basePath, mapPath);
    const fileContent = parser.readTextFile(filePath);
    const lineList = parser.splitFile(fileContent);
    console.log(
      "🚀 ~ file: map.spec.ts ~ line 17 ~ mockMap ~ lineList",
      lineList
    );
    const newMap = mapTreasure.createMap(lineList);
    return newMap;
  };

  beforeEach(() => {
    adventurer = new A();
    parser = new Parser();
    mapTreasure = new MapTreasure(adventurer);
    basePath = path.join(__dirname, "map");
  });

  test("When create map with size 2x2 with nothing, should return empty map of 2x2", () => {
    const newMap = mockMap("map2x2.txt");
    const emptyMap = [
      [".", "."],
      [".", "."],
    ];

    expect(newMap).toEqual(emptyMap);
  });

  test("When create map with size 3x2 M at 1-1, should return map with M at 1-1", () => {
    const newMap = mockMap("map3x2_M.txt");

    const tmpMap = [
      [".", ".", "."],
      [".", "M", "."],
    ];

    expect(newMap).toEqual(tmpMap);
  });

  test("When create map with size 3x2 T(1) at 1-1, should return map with T(1) at 1-1", () => {
    const newMap = mockMap("map3x2_M_T.txt");

    const tmpMap = [
      [".", ".", "."],
      [".", "M", "T(1)"],
    ];

    expect(newMap).toEqual(tmpMap);
  });

  test("When create map with size 3x2 A at 0-1, should return map with A at 0-1", () => {
    const newMap = mockMap("map2.txt");
    console.log("🚀 ~ file: map.spec.ts ~ line 62 ~ test ~ newMap", newMap);

    const tmpMap = [
      [".", ".", "."],
      ["A", ".", "."],
      [".", ".", "."],
      [".", ".", "."],
    ];

    expect(newMap).toEqual(tmpMap);
  });

  test("When create map A, should return A's data", () => {
    const newMap = mockMap("map2.txt");

    const tmpMap = [
      [".", ".", "."],
      ["A", ".", "."],
      [".", ".", "."],
      [".", ".", "."],
    ];

    expect(newMap).toEqual(tmpMap);
  });
});

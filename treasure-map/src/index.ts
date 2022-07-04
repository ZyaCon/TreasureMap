import { Parser } from "./parser/parser";
import { MapTreasure } from "./map/map";
import { A } from "./adventurer/adventurer";
import { Runner } from "./runner/runner";

const main = (pathArg: string) => {
  if (!pathArg) {
    throw "Missing map file.";
  }

  const fileName = pathArg.substring(
    pathArg.lastIndexOf("/") + 1 || pathArg.indexOf(""),
    pathArg.lastIndexOf(".txt")
  );

  const parser = new Parser();
  const fileContent = parser.readTextFile(pathArg);
  const lineList = parser.splitFile(fileContent);

  const adventurer = new A();
  const mapTreasure = new MapTreasure(adventurer);
  const map = mapTreasure.createMap(lineList);
  console.log("🚀 ~ newMap", map);

  const runner = new Runner(map, adventurer);
  runner.run();
  const endMap = runner.endMap;
  console.log("FINAL MAP", endMap);
  parser.writeEndingFile(endMap, fileName);

  return;
};

main(process.argv[2]);

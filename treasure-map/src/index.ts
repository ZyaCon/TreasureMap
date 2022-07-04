import { Parser } from "./parser/parser";
import { MapTreasure } from "./map/map";
import { Runner } from "./runner/runner";

const main = (pathArg: string) => {
  if (!pathArg) {
    throw "Missing map file.";
  }

  const parser = new Parser();
  const fileContent = parser.readTextFile(pathArg);

  const lineList = parser.splitFile(fileContent);

  const mapTreasure = new MapTreasure();
  const map = mapTreasure.createMap(lineList);
  console.log("Start Map:", map);
  const adventurer = mapTreasure.currentAdventurer;

  const runner = new Runner(map, { adventurer, lastTile: "." });
  runner.run();

  const adventurerEndState = runner.adventurerEndState;
  const endMap = runner.endMap;
  console.log("Final Map:", endMap);
  parser.writeEndingFile(endMap, lineList, adventurerEndState);

  return;
};

main(process.argv[2]);

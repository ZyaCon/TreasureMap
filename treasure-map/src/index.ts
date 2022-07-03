import { Parser } from "./parser/parser";
import { Map } from "./map/map";

const main = (path: string) => {
  const parser = new Parser();
  const map = new Map();

  const fileContent = parser.readTextFile("../test/map1.txt");
  const lineList = parser.splitFile(fileContent);

  const newMap = map.createMap(lineList);
  console.log("🚀 ~ newMap", newMap);

  const endMap = map.play(newMap);
  console.log("FINAL MAP", endMap);

  return;
};

main(process.argv[2]);

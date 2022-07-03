import { Parser } from "./parser/parser";
import { Map } from "./map/map";

const main = (path: string) => {
  const parser = new Parser();
  const map = new Map();

  const fileContent = parser.readTextFile("../test/map2.txt");
  const lineList = parser.splitFile(fileContent);

  const newMap = map.createMap(lineList);
  console.log("🚀 ~ newMap", newMap);

  const toto = map.play(newMap);
  console.log("🚀 ~ file: index.ts ~ line 15 ~ main ~ toto", toto);

  return;
};

main(process.argv[2]);

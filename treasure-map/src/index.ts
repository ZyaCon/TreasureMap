import { Parser } from "./parser/parser";
import { Map } from "./map/map";

const main = (pathArg: string) => {
  if (!pathArg) {
    throw "Missing map file.";
  }

  const fileName = pathArg.substring(
    pathArg.lastIndexOf("/") + 1 || pathArg.indexOf(""),
    pathArg.lastIndexOf(".txt")
  );

  const parser = new Parser();
  const map = new Map();

  const fileContent = parser.readTextFile(pathArg);
  const lineList = parser.splitFile(fileContent);

  const newMap = map.createMap(lineList);
  console.log("🚀 ~ newMap", newMap);

  const endMap = map.play(newMap);
  console.log("FINAL MAP", endMap);
  parser.writeEndingFile(endMap, fileName);

  return;
};

main(process.argv[2]);

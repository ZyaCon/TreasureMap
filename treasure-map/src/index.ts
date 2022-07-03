import { Parser } from "./parser/parser";

const main = (path: string) => {
  const parser = new Parser();
  const fileContent = parser.readTextFile("./test/map1.txt");
  const lineList = parser.splitFile(fileContent);
  const map = parser.createMap(lineList);
  console.log("🚀 ~ file: index.ts ~ line 8 ~ main ~ map", map);

  return;
};

main(process.argv[2]);

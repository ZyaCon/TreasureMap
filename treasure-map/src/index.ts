import { Parser } from "./parser";

const main = (path: string) => {
  const parser = new Parser();
  const fileContent = parser.readTextFile("./test/map3x2_M_T.txt");
  const lineList = parser.splitFile(fileContent);
  const map = parser.createMap(lineList);
  console.log("🚀 ~ file: index.ts ~ line 8 ~ main ~ map", map);

  return;
};

main(process.argv[2]);

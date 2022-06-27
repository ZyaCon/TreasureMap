import fs from "fs";
import path from "path";

function isLineValid(line: string) {
  return line !== "" && line[0] !== "#";
}

export function splitFile(fileContent: string) {
  const lineList: string[] = [];

  fileContent.split(/\r?\n/).forEach((line) => {
    if (isLineValid(line)) {
      lineList.push(line);
    }
  });

  return lineList;
}

export function readTextFile(filePath: string) {
  const myPath = path.join(__dirname, filePath);
  const fileContent = fs.readFileSync(myPath).toString();

  return fileContent;
}

import fs from "fs";
import path from "path";

export type Maptoto = {
  token: string;
  x: number;
  y: number;
  nb?: number;
};

export class Parser {
  public splitFile(fileContent: string) {
    const lineList: string[] = [];

    fileContent.split(/\r?\n/).forEach((line) => {
      if (this.isLineValid(line)) {
        const cleanLine = line.split("-").join("");
        lineList.push(cleanLine);
      }
    });

    return lineList;
  }

  private isLineValid(line: string) {
    return line !== "" && line[0] !== "#";
  }

  public readTextFile(filePath: string) {
    const myPath = path.join(__dirname, filePath);
    const fileContent = fs.readFileSync(myPath).toString();

    return fileContent;
  }

  public createMap(lineList: string[]) {
    const emptyMap = this.initMap(lineList);
    let filledMap = this.fillMap(emptyMap, lineList);
    filledMap = this.fillMap(filledMap, lineList);
    //adventurer
  }

  initMap(lineList: string[]) {
    const mapLine = lineList.find((line) => line[0] === "C");

    if (!mapLine) {
      throw "No map found";
    }
    const x = Number(mapLine[1]);
    const y = Number(mapLine[2]);
    const map: string[][] = [];

    for (let index = 0; index < y; index++) {
      map.push(new Array(x).fill("."));
    }
    return map;
  }

  public fillMap(emptyMap: string[][], lineList: string[]) {
    const montainLine = lineList.filter((line) => line[0] === "M");
    const map = emptyMap;

    montainLine.forEach(([token, x, y]) => {
      map[+y][+x] = token;
    });

    const treasureLine = lineList.filter((line) => line[0] === "T");

    treasureLine.forEach(([, x, y, nb]) => {
      map[+y][+x] = nb;
    });

    console.log(
      "🚀 ~ file: parser.ts ~ line 66 ~ Parser ~ montainLine.forEach ~ map",
      map
    );
    return map;
  }
}

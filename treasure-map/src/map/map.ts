import { Adventurer, Orientation } from "../adventurer/adventurer";

enum MapToken {
  MONTAIN = "M",
  TREASURE = "T",
  ADVENTURER = "A",
}

export class Map {
  private map: string[][] = [];

  public createMap(lineList: string[]) {
    this.map = this.initMap(lineList);
    this.filterLine(lineList, "M");
    this.filterLine(lineList, "T");
    this.filterLine(lineList, "A");

    return this.map;
  }

  private initMap(lineList: string[]) {
    const mapLine = lineList.find((line) => line[0] === "C");

    if (!mapLine) {
      throw "No map found";
    }

    const x = Number(mapLine[2]);
    const y = Number(mapLine[4]);
    const map: string[][] = [];

    for (let index = 0; index < y; index++) {
      map.push(new Array(x).fill("."));
    }
    return map;
  }

  private filterLine(lineList: string[], token: string) {
    const tokenLine = lineList.filter((line) => line[0] === token);
    tokenLine.forEach((currentLine) => {
      this.fillMap(currentLine, token);
    });
  }

  private fillMap(currentLine: string, token: string) {
    const lineData = currentLine.split("-");

    if (token === MapToken.MONTAIN) {
      this.map[+lineData[2]][+lineData[1]] = token;
    } else if (token === MapToken.TREASURE) {
      this.map[+lineData[2]][+lineData[1]] = `T(${lineData[3]})`;
    } else if (token === MapToken.ADVENTURER) {
      const A: Adventurer = {
        token: lineData[0],
        name: lineData[1],
        x: +lineData[2],
        y: +lineData[3],
        orientation: lineData[4] as Orientation,
        sequence: lineData[5],
      };

      this.map[A.y][A.x] = A.token;
    }
  }
}

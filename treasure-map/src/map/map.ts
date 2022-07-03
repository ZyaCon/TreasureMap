import { A, ori } from "../adventurer/adventurer";

enum MapToken {
  MONTAIN = "M",
  TREASURE = "T",
  ADVENTURER = "A",
}

export class Map {
  private map: string[][] = [];
  private a = new A();

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
      this.a.adventurer = {
        token: lineData[0],
        name: lineData[1],
        x: +lineData[2],
        y: +lineData[3],
        orientation: lineData[4],
        sequence: lineData[5],
        treasure: 0,
      };

      this.map[this.a.adventurer.y][this.a.adventurer.x] =
        this.a.adventurer.token;
    }
  }

  public play(currentMap: string[][]) {
    this.map = currentMap;
    const sequence = this.a.adventurer.sequence;
    const steps = sequence.length;

    for (let i = 0; i < steps; i++) {
      console.log("🚀sequence[i]🚀", sequence[i]);
      switch (sequence[i]) {
        case "A":
          this.forward();
          break;
        case "D":
          this.turn("D");
          break;
        case "G":
          this.turn("G");
          break;

        default:
          break;
      }
      this.map[this.a.adventurer.y][this.a.adventurer.x] = "A";
      console.log("🚀 ~ adventurer", this.a.adventurer);
    }
    return this.map;
  }

  private forward() {
    const position = { y: this.a.adventurer.y, x: this.a.adventurer.x };

    switch (this.a.adventurer.orientation) {
      case "N":
        this.checkObstacle(position.x, position.y - 1);
        this.map[this.a.adventurer.y][this.a.adventurer.x] = ".";
        this.a.adventurer.y = this.a.adventurer.y - 1;

        break;
      case "E":
        this.map[this.a.adventurer.y][this.a.adventurer.x] = ".";
        this.a.adventurer.x = this.a.adventurer.x + 1;

        break;
      case "S":
        this.map[this.a.adventurer.y][this.a.adventurer.x] = ".";
        this.a.adventurer.y = this.a.adventurer.y + 1;

        break;
      case "W":
        this.map[this.a.adventurer.y][this.a.adventurer.x] = ".";
        this.a.adventurer.x = this.a.adventurer.x - 1;

        break;

      default:
        break;
    }

    return;
  }
  private checkObstacle(y: number, x: number) {
    if (this.map[y][x] === "M") {
      return;
    }

    if (this.map[y][x] === ".") {
      this.a.adventurer.y = y;
      this.a.adventurer.x = x;
    }

    if (this.map[y][x].includes("T")) {
      const treasureNumber = this.map[y][x].substring(
        this.map[y][x].indexOf("(") + 1,
        this.map[y][x].lastIndexOf(")")
      ) as unknown as number;

      if (treasureNumber) {
        this.a.adventurer.treasure += 1;
        this.map[y][x] = treasureNumber ? `T(${treasureNumber - 1})` : ".";
      }
    }
  }

  private turn(orientation: string) {
    const indexFromOrientation = ori.findIndex((e) => {
      return e === this.a.adventurer.orientation;
    });

    const orientationLimit = ori.length - 1;

    switch (orientation) {
      case "D":
        if (this.a.adventurer.orientation === ori[orientationLimit]) {
          this.a.adventurer.orientation = ori[0];
        } else {
          this.a.adventurer.orientation = ori[indexFromOrientation + 1];
        }
        break;

      case "G":
        if (this.a.adventurer.orientation === ori[0]) {
          this.a.adventurer.orientation = ori[orientationLimit];
        } else {
          this.a.adventurer.orientation = ori[indexFromOrientation - 1];
        }
        break;

      default:
        break;
    }
  }
}

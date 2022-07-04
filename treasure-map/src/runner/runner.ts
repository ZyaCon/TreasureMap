import { Cartography } from "../map/map";
import { A, ori } from "../adventurer/adventurer";

export class Runner {
  constructor(
    private readonly map: Cartography,
    private readonly adventurer: A
  ) {}

  public run() {
    const sequence = this.adventurer.adventurer.sequence;
    const steps = sequence.length;

    for (let i = 0; i < steps; i++) {
      console.log("🚀sequence[i]", sequence[i]);
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
      this.map[this.adventurer.adventurer.y][this.adventurer.adventurer.x] =
        "A";
      console.log("🚀adventurer", this.adventurer.adventurer);
    }
    return this.map;
  }

  private forward() {
    switch (this.adventurer.adventurer.orientation) {
      case "N":
        this.checkPath(
          this.adventurer.adventurer.x,
          this.adventurer.adventurer.y - 1
        );

        break;
      case "E":
        this.checkPath(
          this.adventurer.adventurer.x + 1,
          this.adventurer.adventurer.y
        );

        break;
      case "S":
        this.checkPath(
          this.adventurer.adventurer.x,
          this.adventurer.adventurer.y + 1
        );

        break;
      case "W":
        this.checkPath(
          this.adventurer.adventurer.x - 1,
          this.adventurer.adventurer.y
        );

        break;

      default:
        break;
    }

    return;
  }
  private checkPath(x: number, y: number) {
    if (
      this.map[y][x] !== "." &&
      !this.map[y][x].includes("T") &&
      this.map[y][x] === "M"
    ) {
      return;
    }

    let treasureNumber = 0;

    if (this.map[y][x].includes("T")) {
      treasureNumber = this.map[y][x].substring(
        this.map[y][x].indexOf("(") + 1,
        this.map[y][x].lastIndexOf(")")
      ) as unknown as number;

      if (treasureNumber > 0) {
        this.adventurer.adventurer.treasure += 1;
      }
    }

    this.map[this.adventurer.adventurer.y][this.adventurer.adventurer.x] =
      this.adventurer.lastTile;
    this.adventurer.adventurer.y = y;
    this.adventurer.adventurer.x = x;
    this.adventurer.lastTile = treasureNumber
      ? `T(${treasureNumber - 1})`
      : ".";
  }

  private turn(orientation: string) {
    const indexFromOrientation = ori.findIndex((e) => {
      return e === this.adventurer.adventurer.orientation;
    });

    const orientationLimit = ori.length - 1;

    switch (orientation) {
      case "D":
        if (this.adventurer.adventurer.orientation === ori[orientationLimit]) {
          this.adventurer.adventurer.orientation = ori[0];
        } else {
          this.adventurer.adventurer.orientation =
            ori[indexFromOrientation + 1];
        }
        break;

      case "G":
        if (this.adventurer.adventurer.orientation === ori[0]) {
          this.adventurer.adventurer.orientation = ori[orientationLimit];
        } else {
          this.adventurer.adventurer.orientation =
            ori[indexFromOrientation - 1];
        }
        break;

      default:
        break;
    }
  }

  public get endMap() {
    return this.map;
  }
}

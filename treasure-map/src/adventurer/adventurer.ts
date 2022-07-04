// export enum Orientation {
//   NORTH,
//   EAST,
//   SOUTH,
//   WEST,
// }

export const ori = ["N", "E", "S", "W"];

export interface Adventurer {
  token: string;
  name: string;
  x: number;
  y: number;
  orientation: string;
  sequence: string;
  treasure: number;
}

export class A {
  public lastTile = ".";
  public adventurer: Adventurer = {
    token: "",
    name: "",
    x: 0,
    y: 0,
    orientation: "N",
    sequence: "",
    treasure: 0,
  };
}

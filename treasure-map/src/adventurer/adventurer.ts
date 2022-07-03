export enum Orientation {
  NORTH = "N",
  EAST = "E",
  SOUTH = "S",
  WEST = "W",
}

export interface Adventurer {
  token: string;
  name: string;
  x: number;
  y: number;
  orientation: Orientation;
  sequence: string;
}

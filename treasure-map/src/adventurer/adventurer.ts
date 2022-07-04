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

export const defaultAdventurer: Adventurer = {
  token: "",
  name: "",
  x: 0,
  y: 0,
  orientation: "N",
  sequence: "",
  treasure: 0,
};

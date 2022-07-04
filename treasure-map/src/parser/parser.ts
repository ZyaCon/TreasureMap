import fs from "fs";
import path from "path";
import { RunnerAdventurer } from "../runner/runner";

export class Parser {
  public splitFile(fileContent: string) {
    const lineList: string[] = [];

    fileContent.split(/\r?\n/).forEach((line) => {
      if (this.isLineValid(line)) {
        lineList.push(line);
      }
    });

    return lineList;
  }

  private isLineValid(line: string) {
    return line !== "" && line[0] !== "#";
  }

  public readTextFile(filePath: string) {
    const myPath = path.join(filePath);
    const fileContent = fs.readFileSync(myPath).toString();

    return fileContent;
  }

  public writeEndingFile(
    map: string[][],
    lineList: string[],
    adventurerEndState: RunnerAdventurer
  ) {
    const file = fs.createWriteStream("result.txt");
    file.on("error", function (err) {
      throw err;
    });

    let resultContent = "";

    lineList.forEach((line) => {
      if (line.includes("M")) {
        resultContent += `${line}\n`;
      }
    });

    map.forEach((row, verticalIndex) => {
      row.forEach((tile, horizontalIndex) => {
        if (tile.includes("T")) {
          const treasureNumber = tile.substring(
            tile.indexOf("(") + 1,
            tile.lastIndexOf(")")
          ) as unknown as number;
          resultContent += `T-${horizontalIndex}-${verticalIndex}-${treasureNumber}\n`;
        }
      });
    });

    lineList.forEach((line) => {
      if (line.includes("A")) {
        const { name, x, y, treasure, orientation } =
          adventurerEndState.adventurer;
        resultContent += `A-${name}-${x}-${y}-${orientation}-${treasure}`;
      }
    });
    file.write(resultContent);
    file.end();
  }
}

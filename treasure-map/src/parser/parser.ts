import fs from "fs";
import path from "path";

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

  public writeEndingFile(map: string[][], fileName: string) {
    const file = fs.createWriteStream(`${fileName}.txt`);
    file.on("error", function (err) {
      console.error(err);
    });
    map.forEach(function (v) {
      file.write(v.join(" ") + "\n");
    });
    file.end();
  }
}

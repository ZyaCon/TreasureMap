import { readTextFile, splitFile } from "./parser";
describe("Parser", () => {
  test("When read hello.txt, it should return hello-world", () => {
    const fileContent = readTextFile("./test/hello.txt");
    expect(fileContent).toEqual("hello-world");
  });

  test("When read mapWithIgnore.txt, it should return 5 lines", () => {
    const fileContent = readTextFile("./test/mapWithIgnore.txt");
    const lineList = splitFile(fileContent);

    expect(lineList.length).toEqual(5);
  });
});

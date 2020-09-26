import { uuidv4 } from "./constants";

interface IGrid {
  generateBoard: (rows: number, columns: number) => Array<any>;
  grid: Array<JSX.Element>;
}
export default class Grid implements IGrid {
  constructor(row: number, column: number) {
    this.grid = this.generateBoard(row, column);
  }

  public grid: Array<any>;

  generateBoard = (rows: number, columns: number): Array<any> => {
    let result: any = [];
    for (let i = 0; i < columns; i++) {
      result.push([]);
      for (let j = 0; j < rows; j++) {
        result[i].push([uuidv4()]);
      }
    }
    return result;
  };
}

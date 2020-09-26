import { uuidv4 } from "./constants";
import { IGrid, INodeProperties } from "./interface";

export default class Grid implements IGrid {
  constructor(row: number, column: number) {
    this.grid = this.generateBoard(row, column);
  }

  public grid: Array<Array<INodeProperties>>;

  addPropertiesToNode = (column: number, row: number): INodeProperties => {
    let weight = Math.floor(Math.random() * 9) + 1;
    return {
      column,
      row,
      weight,
      key: uuidv4(),
    };
  };

  generateBoard = (rows: number, columns: number): Array<any> => {
    let result: any = [];
    for (let c = 0; c < columns; c++) {
      result.push([]);
      for (let r = 0; r < rows; r++) {
        result[c].push(this.addPropertiesToNode(c + 1, r + 1));
      }
    }
    return result;
  };
}

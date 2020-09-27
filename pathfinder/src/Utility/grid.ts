import { uuidv4, DEFAULT_START, DEFAULT_END } from "./constants";
import { IGrid, INodeProperties } from "./interfaces";

export default class Grid implements IGrid {
  constructor(row: number, column: number) {
    this.grid = this.generateBoard(row, column);
  }

  public grid: Array<Array<INodeProperties>>;

  addPropertiesToNode = (column: number, row: number): INodeProperties => {
    let weight = Math.floor(Math.random() * 9) + 1;
    return {
      isStart: DEFAULT_START[0] === row && DEFAULT_START[1] === column,
      isEnd: DEFAULT_END[0] === row && DEFAULT_END[1] === column,
      column,
      row,
      isWall: false,
      weight,
      key: uuidv4(),
    };
  };

  generateBoard = (rows: number, columns: number): Array<any> => {
    let result: any = [];
    for (let c = 0; c < columns; c++) {
      result.push([]);
      for (let r = 0; r < rows; r++) {
        result[c].push(this.addPropertiesToNode(c, r));
      }
    }
    return result;
  };
  toggleWall = (row: number, col: number) => {
    this.grid[col][row].isWall = !this.grid[col][row].isWall;
  };
}

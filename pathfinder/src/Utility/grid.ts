import Dijsktra from "./Algorithms/Dijkstra";
import { Graph } from "./Algorithms/Graph";
import { uuidv4, DEFAULT_START, DEFAULT_END } from "./constants";
import { IGraph, IGrid, INodeProperties } from "./interfaces";

export default class Grid implements IGrid {
  public grid: Array<Array<INodeProperties>>;
  public graph: IGraph = new Graph();
  constructor(row: number, column: number) {
    this.grid = this.generateBoard(row, column);
  }

  addPropertiesToNode = (column: number, row: number): INodeProperties => {
    let weight = Math.floor(Math.random() * 9) + 1;
    return {
      isStart: DEFAULT_START[0] === row && DEFAULT_START[1] === column,
      isEnd: DEFAULT_END[0] === row && DEFAULT_END[1] === column,
      column,
      row,
      isWall: false,
      weight,
      identifier: `${column}${row}`,
      key: uuidv4(),
    };
  };
  generateBoard = (rows: number, columns: number): Array<any> => {
    let result: any = [];
    for (let c = 0; c < columns; c++) {
      result.push([]);
      for (let r = 0; r < rows; r++) {
        let properties = this.addPropertiesToNode(c, r);
        result[c].push(properties);
        this.graph.addNodes(properties);
      }
    }
    this.graph.addEdgesToVertex();
    let x = new Dijsktra(this.graph.node, this.graph.graph);
    x.Dijkstra(
      `${DEFAULT_START[1]}${DEFAULT_START[0]}`,
      `${DEFAULT_END[1]}${DEFAULT_END[0]}`
    );
    return result;
  };
  toggleWall = (row: number, col: number) => {
    this.grid[col][row].isWall = !this.grid[col][row].isWall;
  };
  toggleStart = (row: number, col: number) => {
    this.grid[col][row].isStart = !this.grid[col][row].isStart;
  };
  toggleEnd = (row: number, col: number) => {
    this.grid[col][row].isEnd = !this.grid[col][row].isEnd;
  };
}

export interface IGrid {
  generateBoard: (
    rows: number,
    columns: number
  ) => Array<Array<INodeProperties>>;
  addPropertiesToNode: (column: number, row: number) => INodeProperties;
  toggleWall: (row: number, col: number) => void;
  grid: Array<Array<INodeProperties>>;
}

export interface INodeProperties {
  column: number;
  row: number;
  weight: number;
  key: string;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
}

export interface INodeProps {
  weight: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  row: number;
  column: number;
  onMouseDown: (row: number, col: number) => any;
  onMouseUp: () => any;
  onMouseEnter: (row: number, col: number) => any;
}

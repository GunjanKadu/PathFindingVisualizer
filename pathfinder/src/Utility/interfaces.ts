export interface IGrid {
  generateBoard: (
    rows: number,
    columns: number
  ) => Array<Array<INodeProperties>>;
  addPropertiesToNode: (column: number, row: number) => INodeProperties;
  toggleWall: (row: number, col: number) => void;
  toggleStart: (row: number, col: number) => void;
  toggleEnd: (row: number, col: number) => void;
  getCurrentGeneratedGraph: () => IGraph;
  grid: Array<Array<INodeProperties>>;
  graph: any;
}

export interface INodeProperties {
  column: number;
  row: number;
  weight: number;
  key: string;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  identifier: string;
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
  // onClick: () => void;
}
export interface IState {
  isMousePressed: boolean;
  grid: IGrid;
  defaultStart: Array<number>;
  defaultEnd: Array<number>;
  movingStart: boolean;
  movingEnd: boolean;
  graph: IGraph | undefined;
  isVisualizedClicked: boolean;
}
export interface IGraph {
  node: { [key: string]: INodeProperties };
  graph: { [key: string]: Array<string> };
  addNodes: (node: INodeProperties) => void;
  addVertexToGraph: (node: INodeProperties) => void;
  addEdgesToVertex: () => void;
  findAllNeighbours: (currenVertex: INodeProperties) => void;
}
export interface IPriorityQueue {
  queue: Array<{ node: INodeProperties; weight: number }>;
  enQueue: (node: INodeProperties, weight: number) => void;
  deQueue: () => { node: INodeProperties; weight: number } | undefined;
  sort: () => void;
}
export interface IDijkstra {
  nodes: { [key: string]: INodeProperties };
  graph: { [key: string]: Array<string> };
  Dijkstra: (start: string, end: string) => any;
  setInitialState: (distances: {}, previous: {}, queue: IPriorityQueue) => any;
}
export interface IHeader {
  visualize: boolean;
  changeAlgo: (value: string) => void;
  startVisualizing: () => void;
}

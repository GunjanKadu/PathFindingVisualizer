export interface IGrid {
  grid: Array<Array<INodeProperties>>;
  initializeNode: (
    row: number,
    col: number,
    weighted: boolean,
    start: Array<number>,
    end: Array<number>
  ) => INodeProperties;
  toggleWall: (row: number, col: number) => void;
  toggleStart: (row: number, col: number) => void;
  toggleEnd: (row: number, col: number) => void;
}

export interface INodeProperties {
  col: number;
  row: number;
  isEnd: boolean;
  isStart: boolean;
  isVisited: boolean;
  isWall: boolean;
  distance: number;
  previous: any;
  weight: number;
}

export interface INodeProps {
  column: number;
  row: number;
  weight: number;
  key: string;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  identifier: string;
}
export interface IState {
  algo: IDijkstra;
  algoText: String;
  speed: String;
  grid: IGrid;
  mouseIsPressed: false;
  animator: IAnimator;
  visualized: false;
  start: Array<number>;
  end: Array<number>;
  movingStart: boolean;
  movingEnd: boolean;
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
  visitedNodes: Array<string>;
  shortestPath: Array<string>;
  Dijkstra: (start: string, end: string) => Array<string>;
  setInitialState: (distances: {}, previous: {}, queue: IPriorityQueue) => any;
  getAllVisitedNodes: () => Array<string>;
}
export interface IHeader {
  visualize: boolean;
  changeAlgo: (value: string) => void;
  startVisualizing: () => void;
}

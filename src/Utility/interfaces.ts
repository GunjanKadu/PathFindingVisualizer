import { TBellmanFord } from "./Algorithms/BellmanFord";
import { TBFS } from "./Algorithms/BFS";
import { TDFS } from "./Algorithms/DFS";
import { TDijsktra } from "./Algorithms/Dijkstra";

export interface IGrid {
  grid: Array<Array<INodeProperties>>;
  initializeNode: (
    row: number,
    col: number,
    weighted: boolean,
    start: Array<number>,
    end: Array<number>
  ) => INodeProperties;
  initializeGrid: (
    weighted: boolean,
    start: Array<number>,
    end: Array<number>
  ) => Array<Array<INodeProperties>>;
  toggleWall: (row: number, col: number) => void;
  toggleStart: (row: number, col: number) => void;
  toggleEnd: (row: number, col: number) => void;
}
export interface IFinder {
  getUnvisitedNeighbors: (
    node: INodeProperties,
    grid: Array<Array<INodeProperties>>
  ) => Array<INodeProperties>;
  getShortestPath(
    startNode: INodeProperties,
    endNode: INodeProperties
  ): Array<INodeProperties>;
  getAllNodes: (grid: Array<Array<INodeProperties>>) => Array<INodeProperties>;
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
  traverse: (
    grid: Array<Array<INodeProperties>>,
    startNode: INodeProperties,
    endNode: INodeProperties
  ) => Array<INodeProperties> | undefined;
  sortNodesByDistance: (unvisitedNodes: Array<INodeProperties>) => void;
}
export interface IBFS {
  traverse: (
    grid: Array<Array<INodeProperties>>,
    startNode: INodeProperties,
    endNode: INodeProperties
  ) => Array<INodeProperties> | undefined;
}
export interface IBellMan {
  traverse: (
    grid: Array<Array<INodeProperties>>,
    startNode: INodeProperties,
    endNode: INodeProperties
  ) => Array<INodeProperties> | undefined;
}
export interface IDFS {
  traverse: (
    grid: Array<Array<INodeProperties>>,
    startNode: INodeProperties,
    endNode: INodeProperties
  ) => Array<INodeProperties> | undefined;
}
export interface IHeader {
  visualize: boolean;
  changeAlgo: (value: string) => void;
  startVisualizing: () => void;
}
export interface IAnimator {
  visitedSpeed: number;
  shortestSpeed: number;
  animate: (
    visitedNodesInOrder: Array<INodeProperties>,
    nodesInShortestPathOrder: Array<INodeProperties>
  ) => void;
  animateShortestPath: (
    nodesInShortestPathOrder: Array<INodeProperties>
  ) => void;
  updateSpeed: (visitedSpeed: number, shortestSpeed: number) => void;
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
export interface IVisualizerState {
  algo?: algo;
  algoText?: String;
  speed?: String;
  grid?: IGrid;
  mouseIsPressed?: boolean;
  animator?: IAnimator;
  visualized?: boolean;
  start?: Array<number>;
  end?: Array<number>;
  movingStart?: boolean;
  movingEnd?: boolean;
}
export type algo = TDijsktra | TBFS | TDFS | TBellmanFord;

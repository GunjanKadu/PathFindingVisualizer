import { IFinder, INodeProperties } from "../interfaces";

/* Default class for other pathfinding algorithms to inherit from.*/
export default class Finder implements IFinder {
  static _time = 12.5;
  getUnvisitedNeighbors(
    node: INodeProperties,
    grid: Array<Array<INodeProperties>>
  ): Array<INodeProperties> {
    /* Get the unvisited neighbors of
    node which are not walls.*/
    let neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    neighbors = neighbors.filter((neighbor) => !neighbor.isVisited);
    return neighbors.filter((neighbor) => !neighbor.isWall);
  }

  getShortestPath(
    startNode: INodeProperties,
    endNode: INodeProperties
  ): Array<INodeProperties> {
    /* Backtrack from the endNode to the
      startNode to get the shortest path */
    const shortestPath = [];
    let currentNode = endNode;
    while (currentNode !== null && currentNode !== startNode) {
      shortestPath.unshift(currentNode);
      currentNode = currentNode.previous;
    }
    shortestPath.unshift(startNode);
    return shortestPath;
  }

  getAllNodes(grid: Array<Array<INodeProperties>>): Array<INodeProperties> {
    const nodes = [];
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 49; j++) {
        if (grid[i][j].isVisited || grid[i][j].isWall) continue;
        nodes.push(grid[i][j]);
      }
    }
    return nodes;
  }
}

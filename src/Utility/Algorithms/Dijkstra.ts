/**
 *
 * @Project :  ${PathFinding Visualizer(Path Finding Visualizer)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-09-10 23:47:40
 *
 */
import { IDijkstra, INodeProperties } from "../interfaces";

import Pathfinder from "./Finder";

export default class Dijkstra extends Pathfinder implements IDijkstra {
  static weighted = true;
  static text = `One algorithm for finding the shortest path from a starting node to a target node in a weighted graph is Dijkstra’s algorithm. The algorithm creates a tree of shortest paths from the starting vertex, the source, to all other points in the graph.Dijkstra's shortest path algorithm works on weighted graphs and
guarantees the shortest path. This algorithm works similarly to breadth-first
search in that it begins at the start node and then works it's way outward in
all directions. As it works outwards it checks the edges (u,v,w) to see if
u.distance + w is less than v.distance. If so it updates v.distance to hold
u.distance + w. It continues this process until no more nodes can be visited,
or until the destination node is found.`;

  traverse(
    grid: Array<Array<INodeProperties>>,
    startNode: INodeProperties,
    endNode: INodeProperties
  ): Array<INodeProperties> | undefined {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.weight = 0;
    const unvisited: Array<INodeProperties> = this.getAllNodes(grid);

    while (unvisited.length !== 0) {
      this.sortNodesByDistance(unvisited);
      const closestNode: any = unvisited.shift();
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode?.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === endNode) return visitedNodesInOrder;
      let neighbors = this.getUnvisitedNeighbors(closestNode, grid);
      for (const neighbor of neighbors) {
        let newDistance = closestNode.distance + neighbor.weight;
        if (newDistance < neighbor.distance) {
          neighbor.distance = newDistance;
          neighbor.previous = closestNode;
        }
      }
    }
  }

  sortNodesByDistance(unvisitedNodes: Array<INodeProperties>): void {
    unvisitedNodes.sort(
      (nodeA: INodeProperties, nodeB: INodeProperties) =>
        nodeA.distance - nodeB.distance
    );
  }
}
export type TDijsktra = typeof Dijkstra;

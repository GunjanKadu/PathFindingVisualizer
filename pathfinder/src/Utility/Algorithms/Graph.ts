import { IGraph, INodeProperties } from "../interfaces";

export class Graph implements IGraph {
  node: { [key: string]: INodeProperties };
  graph: { [key: string]: Array<string> };

  constructor() {
    this.node = {};
    this.graph = {};
  }

  addNodes(newNode: INodeProperties) {
    this.node[newNode.identifier] = newNode;
    this.addVertexToGraph(this.node[newNode.identifier]);
  }
  addVertexToGraph(newNode: INodeProperties) {
    this.graph[newNode.identifier] = [];
  }
  addEdgesToVertex() {
    for (let vertex in this.node) {
      let currentVertex = this.node[vertex];
      let neighbours = this.findAllNeighbours(currentVertex);
      this.graph[vertex] = neighbours;
    }
    console.log(this.graph);
  }
  findAllNeighbours(currentVertex: INodeProperties) {
    let neighbour: Array<string> = [];
    if (this.node[`${currentVertex.column - 1}${currentVertex.row}`])
      neighbour.push(
        this.node[`${currentVertex.column - 1}${currentVertex.row}`].identifier
      );
    if (this.node[`${currentVertex.column + 1}${currentVertex.row}`])
      neighbour.push(
        this.node[`${currentVertex.column + 1}${currentVertex.row}`].identifier
      );
    if (this.node[`${currentVertex.column}${currentVertex.row + 1}`])
      neighbour.push(
        this.node[`${currentVertex.column}${currentVertex.row + 1}`].identifier
      );
    if (this.node[`${currentVertex.column}${currentVertex.row - 1}`])
      neighbour.push(
        this.node[`${currentVertex.column}${currentVertex.row - 1}`].identifier
      );
    return neighbour;
  }
}

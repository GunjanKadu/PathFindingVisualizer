import { IDijkstra, INodeProperties, IPriorityQueue } from "../interfaces";

export default class Dijsktra implements IDijkstra {
  nodes: { [key: string]: INodeProperties };
  graph: { [key: string]: Array<string> };

  constructor(nodes: any, graph: any) {
    this.nodes = nodes;
    this.graph = graph;
  }
  Dijkstra(start: string, end: string) {
    // console.log(start, end);
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const queue = new PriorityQueue();
    const path = [];
    this.setInitialState(distances, previous, queue);
    while (queue.queue.length > 0) {
      let smallestWeightedVertex:
        | { node: INodeProperties; weight: number }
        | undefined = queue.deQueue();

      let key: any = `${smallestWeightedVertex?.node.column}${smallestWeightedVertex?.node.row}`;
      if (end === key) {
        while (previous[key]) {
          path.push(key);
          key = previous[key];
        }
        path.push(start);

        break;
      }
      for (let vertex in this.graph[key]) {
        //   console.log(this.graph[key][vertex]);
        let neighbour: INodeProperties = this.nodes[this.graph[key][vertex]];
        let distanceToNextNode: number = distances[key] + neighbour.weight;
        if (
          distances[`${neighbour.column}${neighbour.row}`] > distanceToNextNode
        ) {
          distances[`${neighbour.column}${neighbour.row}`] =
            distances[key] + neighbour.weight;
          previous[`${neighbour.column}${neighbour.row}`] = key;
          queue.enQueue(neighbour, neighbour.weight);
        }
      }
    }
    console.log(path.reverse());
  }
  setInitialState(
    distances: { [key: string]: number },
    previous: { [key: string]: string | null },
    queue: IPriorityQueue
  ) {
    for (let vertex in this.nodes) {
      if (this.nodes[vertex].isStart) {
        distances[vertex] = 0;
        queue.enQueue(this.nodes[vertex], 0);
      } else {
        distances[vertex] = Infinity;
        queue.enQueue(this.nodes[vertex], Infinity);
      }
      previous[vertex] = null;
    }
  }
}

class PriorityQueue implements IPriorityQueue {
  queue: Array<{ node: INodeProperties; weight: number }> = [];
  constructor() {
    this.queue = [];
  }
  enQueue(node: INodeProperties, weight: number) {
    this.queue.push({ node, weight });
    this.sort();
  }
  deQueue() {
    return this.queue.shift();
  }
  sort() {
    this.queue.sort(
      (
        a: { node: INodeProperties; weight: number },
        b: { node: INodeProperties; weight: number }
      ) => a.weight - b.weight
    );
  }
}

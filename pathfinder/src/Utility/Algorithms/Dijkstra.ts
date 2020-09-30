import { IDijkstra, INodeProperties, IPriorityQueue } from "../interfaces";

export default class Dijsktra implements IDijkstra {
  node: { [key: string]: INodeProperties };
  graph: { [key: string]: Array<string> };

  constructor(
    node: { [key: string]: INodeProperties },
    graph: { [key: string]: Array<string> }
  ) {
    this.node = node;
    this.graph = graph;
  }
  Dijkstra() {
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const queue = new PriorityQueue();
    this.setInitialState(distances, previous, queue);
    console.log("Distances", distances);
    console.log("Previous", previous);
    console.log("Queue", queue);
  }
  setInitialState(
    distances: { [key: string]: number },
    previous: { [key: string]: string | null },
    queue: IPriorityQueue
  ) {
    console.log(this.node);
    for (let vertex in this.node) {
      if (this.node[vertex].isStart) {
        distances[vertex] = 0;
        queue.enQueue(this.node[vertex], 0);
      } else {
        distances[vertex] = Infinity;
        queue.enQueue(this.node[vertex], Infinity);
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

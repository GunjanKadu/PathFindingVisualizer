import React, { Component } from "react";
import Header from "../TopBar/topbar";
import Node from "../Node/node";
import Animator from "../../Utility/Animator";

// import { randomWalls, recursiveDivision } from "../mazes/mazes";
import Grid from "../../Utility/grid";
import {
  algo,
  IGrid,
  INodeProperties,
  IVisualizerState,
} from "../../Utility/interfaces";
import BellmanFord from "../../Utility/Algorithms/BellmanFord";
import BFS from "../../Utility/Algorithms/BFS";
import DFS from "../../Utility/Algorithms/DFS";
import Dijkstra from "../../Utility/Algorithms/Dijkstra";

import "./board.css";
const DEFAULT_START: Array<number> = [9, 9];
const DEFAULT_END: Array<number> = [9, 39];
/*
Visualizer component which controls much of the functionality of the app.
*/
export default class Visualizer extends Component<{}, IVisualizerState> {
  constructor(props: any) {
    super(props);

    this.state = {
      algo: Dijkstra,
      algoText: "Dijkstra's",
      speed: "Fast",
      grid: new Grid(Dijkstra.weighted, DEFAULT_START, DEFAULT_END),
      mouseIsPressed: false,
      animator: new Animator(),
      visualized: false,
      start: DEFAULT_START,
      end: DEFAULT_END,
      movingStart: false,
      movingEnd: false,
    };

    this.visualize = this.visualize.bind(this);
    this.speedChange = this.speedChange.bind(this);
    this.algoChange = this.algoChange.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.newWeights = this.newWeights.bind(this);
    this.generateMaze = this.generateMaze.bind(this);
  }

  /*
  The handleMouseXxxx functions handle the
  modifying of nodes to become walls and also
  the moving of the start and ending nodes.
  */
  handleMouseDown(row: number, col: number) {
    console.log("Mouse Down");
    const { grid, start, end, visualized } = this.state;
    if (visualized) return;
    if (start && end) {
      if (row === start[0] && col === start[1]) {
        this.setState({ movingStart: true });
      } else if (row === end[0] && col === end[1]) {
        this.setState({ movingEnd: true });
      } else {
        grid && grid.toggleWall(row, col);
      }
      this.setState({ grid: grid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row: number, col: number) {
    console.log("Mouse Enter");
    const {
      grid,
      start,
      end,
      mouseIsPressed,
      movingStart,
      movingEnd,
      visualized,
    } = this.state;
    if (!mouseIsPressed || visualized) return;
    if (start && end) {
      if (movingStart) {
        grid && grid.toggleStart(row, col);
        grid && grid.toggleStart(start[0], start[1]);
        this.setState({
          start: [row, col],
          movingStart: true,
        });
      } else if (movingEnd) {
        grid && grid.toggleEnd(row, col);
        grid && grid.toggleEnd(end[0], end[1]);
        this.setState({ end: [row, col], movingEnd: true });
      } else {
        grid && grid.toggleWall(row, col);
      }
      this.setState({
        grid: grid,
      });
    }
  }

  handleMouseUp() {
    console.log("Mouse Up");
    const { visualized } = this.state;
    if (visualized) return;
    this.setState({
      mouseIsPressed: false,
      movingStart: false,
      movingEnd: false,
    });
  }

  /* Handles the selection of algorithms.*/
  algoChange(text: string) {
    const { grid, start, end, visualized } = this.state;
    if (visualized) return;
    if (start && end && grid) {
      const algo: {
        newAlgo: algo | null;
        newAlgoText: string | null;
        newGrid: IGrid | null;
      } = { newAlgo: null, newAlgoText: null, newGrid: null };

      this.unvisitNodes(false, start, end);
      switch (text) {
        case "Dijkstra":
          algo.newAlgo = Dijkstra;
          algo.newAlgoText = "Dijkstra's";
          algo.newGrid = new Grid(Dijkstra.weighted, start, end);
          break;
        case "BFS":
          algo.newAlgo = BFS;
          algo.newAlgoText = "Breadth-First Search";
          algo.newGrid = new Grid(BFS.weighted, start, end);
          break;
        case "DFS":
          algo.newAlgo = DFS;
          algo.newAlgoText = "Depth-First Search";
          algo.newGrid = new Grid(DFS.weighted, start, end);
          break;
        case "Bellman-Ford":
          algo.newAlgo = BellmanFord;
          algo.newAlgoText = "Bellman-Ford";
          algo.newGrid = new Grid(BellmanFord.weighted, start, end);
          break;
        default:
          return;
      }
      algo.newGrid = this.keepWalls(grid, algo.newGrid);
      this.setState({
        algo: algo.newAlgo,
        algoText: algo.newAlgoText,
        grid: algo.newGrid,
      });
    }
  }

  /* Handles the speed selection updating.
  This feature is currently not implemented.*/
  speedChange(text: string) {
    const speeds: {
      visitedSpeed: number | null;
      shortestSpeed: number | null;
    } = { visitedSpeed: null, shortestSpeed: null };
    switch (text) {
      case "Slow":
        speeds.visitedSpeed = 75;
        speeds.shortestSpeed = 375;
        break;
      case "Average":
        speeds.visitedSpeed = 25;
        speeds.shortestSpeed = 125;
        break;
      case "Fast":
        speeds.visitedSpeed = 10;
        speeds.shortestSpeed = 50;
        break;
      default:
        return;
    }
    this.state.animator?.updateSpeed(speeds.visitedSpeed, speeds.shortestSpeed);
  }

  /* Runs the process of visualizing the algorithm.*/
  visualize() {
    const { grid, algo, visualized, start, end, animator } = this.state;
    if (visualized) return;
    if (grid && start && end && algo && animator) {
      this.unvisitNodes(false, start, end);
      this.setState({ visualized: true });
      const traverser = new algo();
      const startNode = grid.grid[start[0]][start[1]];
      const endNode = grid.grid[end[0]][end[1]];
      if (startNode.isWall) {
        startNode.isWall = !startNode.isWall;
      }
      if (endNode.isWall) {
        endNode.isWall = !endNode.isWall;
      }
      let visitedNodesInOrder:
        | Array<INodeProperties>
        | undefined = traverser.traverse(grid.grid, startNode, endNode);
      let shortestPath = traverser.getShortestPath(startNode, endNode);
      if (visitedNodesInOrder) {
        animator?.animate(visitedNodesInOrder, shortestPath);
        let buttonLockTime =
          visitedNodesInOrder.length * animator.visitedSpeed +
          shortestPath.length * animator.shortestSpeed;
        setTimeout(() => this.setState({ visualized: false }), buttonLockTime);
      }
    }
  }

  unvisitNodes(removeWalls: boolean, start: Array<number>, end: Array<number>) {
    const { grid } = this.state;
    for (let row = 0; row < 19; row++) {
      for (let col = 0; col < 49; col++) {
        let node: INodeProperties | undefined = grid?.grid[row][col];
        if (node) {
          const newLocal = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          if (newLocal) newLocal.className = "node ";
          node.isVisited = false;
          node.previous = null;
          node.distance = Infinity;
          if (removeWalls) {
            node.isWall = false;
          } else if (node.isWall) {
            const newLocal_1 = document.getElementById(
              `node-${node.row}-${node.col}`
            );
            if (newLocal_1) newLocal_1.className = "node node-wall";
          }
          if (row === start[0] && col === start[1]) {
            const newLocal_2 = document.getElementById(
              `node-${start[0]}-${start[1]}`
            );
            if (newLocal_2) newLocal_2.className = "node node-start";
            node.isStart = true;
          }
          if (row === end[0] && col === end[1]) {
            const newLocal_3 = document.getElementById(
              `node-${end[0]}-${end[1]}`
            );
            if (newLocal_3) newLocal_3.className = "node node-end";
            node.isEnd = true;
          }
        }
      }
    }
    this.setState({ grid: grid, visualized: false });
  }

  /* Resets the nodes back to default state if removeWalls === true.
  If removeWalls === false, then walls are kept in place.*/
  clearBoard() {
    const { visualized } = this.state;
    if (visualized) return;
    this.unvisitNodes(true, DEFAULT_START, DEFAULT_END);
    this.setState({ start: DEFAULT_START, end: DEFAULT_END });
  }

  /* Creates a new Grid object with new weights.*/
  newWeights() {
    const { grid, algo, start, end, visualized } = this.state;
    if (visualized) return;
    if (start && algo && grid && end) {
      this.unvisitNodes(false, start, end);
      const newGrid = new Grid(algo.weighted, start, end);
      for (let row = 0; row < 19; row++) {
        for (let col = 0; col < 49; col++) {
          if (grid.grid[row][col].isWall) {
            newGrid.grid[row][col].isWall = true;
          }
        }
      }
      this.setState({ grid: newGrid });
    }
  }

  /* Function to transfer wall locations from
 the previous grid to a new grid.*/
  keepWalls(grid: IGrid, newGrid: IGrid) {
    for (let row = 0; row < 19; row++) {
      for (let col = 0; col < 49; col++) {
        if (grid.grid[row][col].isWall) {
          newGrid.grid[row][col].isWall = true;
        }
      }
    }
    return newGrid;
  }

  /* Handles the generation of implemented mazes.*/
  generateMaze(type: string) {
    const { grid, start, end } = this.state;
    if (grid && start && end) {
      this.unvisitNodes(true, start, end);
      switch (type) {
        case "Random":
          // randomWalls(grid);
          break;
        case "RecursiveDivision":
          // recursiveDivision(grid);
          break;
        default:
          return;
      }
      this.setState({ grid: grid });
      /*
      For some reason the following line is needed to
      actually render things correctly if you try and
      generate two mazes without doing some other action.
      */
      this.unvisitNodes(false, start, end);
    }
  }

  render() {
    const { grid, mouseIsPressed, visualized, algo } = this.state;
    return (
      <div>
        <Header
          visualize={this.visualize}
          changeAlgo={this.algoChange}
          changeSpeed={this.speedChange}
          clearBoard={this.clearBoard}
          changeWeights={this.newWeights}
          visualized={visualized}
          generateMaze={this.generateMaze}
        ></Header>

        <h3>The current algorithm is {this.state.algoText}.</h3>
        <div className="information">{algo?.text}</div>
        <div className="board">
          {grid?.grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const { row, col, isEnd, isStart, isWall, weight } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      col={col}
                      row={row}
                      isEnd={isEnd}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row: number, col: number) =>
                        this.handleMouseDown(row, col)
                      }
                      onMouseEnter={(row: number, col: number) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      weight={weight}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

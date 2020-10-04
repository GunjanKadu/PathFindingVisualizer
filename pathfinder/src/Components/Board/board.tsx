import React, { Component } from "react";

import Node from "../Node/node";
import Grid from "../../Utility/grid";
import {
  ALGORITHM,
  DEFAULT_COLUMNS,
  DEFAULT_END,
  DEFAULT_ROWS,
  DEFAULT_START,
} from "../../Utility/constants";
import { INodeProperties, IState } from "../../Utility/interfaces";
import Header from "../TopBar/topbar";
import Dijsktra from "../../Utility/Algorithms/Dijkstra";

import "./board.css";

export default class Board extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isMousePressed: false,
      grid: new Grid(DEFAULT_ROWS, DEFAULT_COLUMNS),
      defaultStart: DEFAULT_START,
      defaultEnd: DEFAULT_END,
      movingEnd: false,
      movingStart: false,
      graph: undefined,
      currentAlgorithm: undefined,
      shortestPathForCurrentAlgorithm: undefined,
      isVisualizedClicked: false,
    };
  }

  handleMouseDown = (row: number, col: number) => {
    const { defaultStart, defaultEnd, grid, isVisualizedClicked } = this.state;
    this.setState({ isMousePressed: true });
    if (!isVisualizedClicked) {
      if (row === defaultStart[0] && col === defaultStart[1]) {
        console.log("Starting Node Clicked");
        this.setState({ movingStart: true });
      } else if (row === defaultEnd[0] && col === defaultEnd[1]) {
        console.log("Ending Node Clicked");
        this.setState({ movingEnd: true });
      } else {
        grid?.toggleWall(row, col);
      }
    }
  };
  handleMouseEnter = (row: number, col: number) => {
    const {
      grid,
      isMousePressed,
      movingEnd,
      movingStart,
      defaultStart,
      defaultEnd,
      isVisualizedClicked,
    } = this.state;

    if (isMousePressed && !isVisualizedClicked) {
      if (movingStart) {
        this.setState({ defaultStart: [row, col] });
        grid.toggleStart(row, col);
        grid.toggleStart(defaultStart[0], defaultStart[1]);
      } else if (movingEnd) {
        this.setState({ defaultEnd: [row, col] });
        grid.toggleEnd(row, col);
        grid.toggleEnd(defaultEnd[0], defaultEnd[1]);
      } else grid?.toggleWall(row, col);

      this.setState({ grid: this.state.grid });
    }
  };
  handleMouseUp = () => {
    this.setState({
      isMousePressed: false,
      movingStart: false,
      movingEnd: false,
    });
  };
  changeAlgorithm = (value: string) => {
    this.setState({ graph: this.state.grid.getCurrentGeneratedGraph() }, () => {
      switch (value) {
        case ALGORITHM.DIJKSTRA:
          this.setState(
            {
              currentAlgorithm: new Dijsktra(
                this.state.graph?.node,
                this.state.graph?.graph
              ),
            },
            () => {
              this.setState({
                shortestPathForCurrentAlgorithm: this.state.currentAlgorithm?.Dijkstra(
                  `${DEFAULT_START[1]}${DEFAULT_START[0]}`,
                  `${DEFAULT_END[1]}${DEFAULT_END[0]}`
                ),
              });
            }
          );
      }
    });
  };
  startVisualizer = () => {
    console.log("StartVisualizer");
    this.setState({ isVisualizedClicked: true });
    // let unvisitedNodes:
    //   | Array<string>
    //   | undefined = this.state.currentAlgorithm?.getAllVisitedNodes();
    this.state.shortestPathForCurrentAlgorithm?.forEach((identifier) => {
      let element: HTMLElement | null = document.getElementById(
        `node-${identifier}`
      );
      if (element) element.className = "node node-visited";
    });
  };

  render() {
    const { grid, isVisualizedClicked } = this.state;
    return (
      <React.Fragment>
        <Header
          changeAlgo={this.changeAlgorithm}
          visualize={isVisualizedClicked}
          startVisualizing={this.startVisualizer}
        />
        <div className="board">
          <h2>Board</h2>
          <div className="board___nodeContainer">
            {grid &&
              grid.grid.length > 0 &&
              grid.grid.map((item: any, i: number) => (
                <div className="rows" key={i}>
                  {item.map((node: INodeProperties, j: number) => {
                    const {
                      row,
                      column,
                      weight,
                      isEnd,
                      isStart,
                      isWall,
                      key,
                      identifier,
                    } = node;
                    return (
                      <span
                        key={key}
                        onClick={() => {
                          console.log({ ...node });
                        }}
                      >
                        <Node
                          row={row}
                          column={column}
                          weight={weight}
                          isStart={isStart}
                          isEnd={isEnd}
                          isWall={isWall}
                          identifier={identifier}
                          onMouseDown={(row: number, col: number) =>
                            this.handleMouseDown(row, col)
                          }
                          onMouseUp={() => this.handleMouseUp()}
                          onMouseEnter={(row: number, col: number) =>
                            this.handleMouseEnter(row, col)
                          }
                        />
                      </span>
                    );
                  })}
                </div>
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

import React, { Component } from "react";

import Node from "../Node/node";
import Grid from "../../Utility/grid";
import {
  DEFAULT_COLUMNS,
  DEFAULT_END,
  DEFAULT_ROWS,
  DEFAULT_START,
} from "../../Utility/constants";
import { INodeProperties, IState } from "../../Utility/interfaces";

import "./board.css";

export default class Board extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isMousePressed: false,
      grid: new Grid(DEFAULT_ROWS, DEFAULT_COLUMNS),
      defaultStart: DEFAULT_START,
      defaultEnd: DEFAULT_END,
    };
  }

  handleMouseDown = (row: number, col: number) => {
    const { defaultStart, defaultEnd, grid } = this.state;
    this.setState({ isMousePressed: true });
    if (row === defaultStart[0] && col === defaultStart[1]) {
      console.log("Starting Node Clicked");
    } else if (row === defaultEnd[0] && col === defaultEnd[1]) {
      console.log("Ending Node Clicked");
    } else {
      grid?.toggleWall(row, col);
    }
  };
  handleMouseEnter = (row: number, col: number) => {
    const { defaultStart, defaultEnd, grid, isMousePressed } = this.state;

    if (isMousePressed) {
      if (row === defaultStart[0] && col === defaultStart[1]) {
        console.log("Starting Node Entered");
      } else if (row === defaultEnd[0] && col === defaultEnd[1]) {
        console.log("Ending Node Entered");
      } else {
        grid?.toggleWall(row, col);
      }
      this.setState({ grid: this.state.grid });
    }
  };
  handleMouseUp = () => {
    this.setState({ isMousePressed: false });
  };

  render() {
    const { grid } = this.state;
    return (
      <div className="board">
        <h2>Board</h2>
        <div className="board___nodeContainer">
          {grid &&
            grid.grid.length > 0 &&
            grid.grid.map((item: any, i: number) => (
              <div className="rows" key={i}>
                {item.map((node: INodeProperties, j: number) => (
                  <span key={node.key}>
                    <Node
                      row={node.row}
                      column={node.column}
                      weight={node.weight}
                      isStart={node.isStart}
                      isEnd={node.isEnd}
                      isWall={node.isWall}
                      onMouseDown={(row: number, col: number) =>
                        this.handleMouseDown(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      onMouseEnter={(row: number, col: number) =>
                        this.handleMouseEnter(row, col)
                      }
                    />
                  </span>
                ))}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

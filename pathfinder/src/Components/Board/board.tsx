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
import Header from "../TopBar/topbar";
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
    };
  }

  handleMouseDown = (row: number, col: number) => {
    const { defaultStart, defaultEnd, grid } = this.state;
    this.setState({ isMousePressed: true });
    if (row === defaultStart[0] && col === defaultStart[1]) {
      console.log("Starting Node Clicked");
      this.setState({ movingStart: true });
    } else if (row === defaultEnd[0] && col === defaultEnd[1]) {
      console.log("Ending Node Clicked");
      this.setState({ movingEnd: true });
    } else {
      grid?.toggleWall(row, col);
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
    } = this.state;

    if (isMousePressed) {
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

  render() {
    const { grid } = this.state;
    return (
      <React.Fragment>
        <Header />
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
                    } = node;
                    return (
                      <span key={key} onClick={() => console.log({ ...node })}>
                        <Node
                          row={row}
                          column={column}
                          weight={weight}
                          isStart={isStart}
                          isEnd={isEnd}
                          isWall={isWall}
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

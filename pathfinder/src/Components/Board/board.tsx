import React, { useEffect, useState } from "react";

import Node from "../Node/node";
import Grid from "../../Utility/grid";
import {
  DEFAULT_COLUMNS,
  DEFAULT_END,
  DEFAULT_ROWS,
  DEFAULT_START,
} from "../../Utility/constants";
import { IGrid, INodeProperties } from "../../Utility/interfaces";

import "./board.css";

function Board() {
  const [grid, setGrid] = useState<IGrid>();
  const [isMousePressed, setIsMousePressed] = useState<boolean>();
  const [defaultStart] = useState<Array<number>>(DEFAULT_START);
  const [defaultEnd] = useState<Array<number>>(DEFAULT_END);

  useEffect(() => {
    let grid = new Grid(DEFAULT_ROWS, DEFAULT_COLUMNS);
    setGrid(grid);
  }, []);

  const handleMouseDown = (row: number, col: number) => {
    setIsMousePressed(true);
    if (row === defaultStart[0] && col === defaultStart[1]) {
      console.log("Starting Node Clicked");
    } else if (row === defaultEnd[0] && col === defaultEnd[1]) {
      console.log("Ending Node Clicked");
    } else {
      grid?.toggleWall(row, col);
    }
  };
  const handleMouseEnter = (row: number, col: number) => {
    if (isMousePressed) {
      if (row === defaultStart[0] && col === defaultStart[1]) {
        console.log("Starting Node Entered");
      } else if (row === defaultEnd[0] && col === defaultEnd[1]) {
        console.log("Ending Node Entered");
      } else {
        grid?.toggleWall(row, col);
      }
    }
  };
  const handleMouseUp = () => {
    setIsMousePressed(false);
  };
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
                      handleMouseDown(row, col)
                    }
                    onMouseUp={() => handleMouseUp()}
                    onMouseEnter={(row: number, col: number) =>
                      handleMouseEnter(row, col)
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

export default Board;

import React, { useEffect, useState } from "react";

import Node from "../Node/node";
import Grid from "../../Utility/grid";
import { DEFAULT_COLUMNS, DEFAULT_ROWS } from "../../Utility/constants";
import { INodeProperties } from "../../Utility/interfaces";

import "./board.css";

function Board() {
  const [grid, setGrid] = useState<Array<Array<INodeProperties>>>();

  useEffect(() => {
    let grid = new Grid(DEFAULT_ROWS, DEFAULT_COLUMNS).grid;
    setGrid(grid);
  }, []);
  return (
    <div className="board">
      <h2>Board</h2>
      <div className="board___nodeContainer">
        {grid &&
          grid.length > 0 &&
          grid.map((item: any, i: number) => (
            <div className="rows" key={i}>
              {item.map((node: INodeProperties, j: number) => (
                <span key={node.key} onClick={() => console.log(node)}>
                  <Node weight={node.weight} />
                </span>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Board;

import { spawn } from "child_process";
import React from "react";
import Node from "../Node/node";
import "./board.css";

function board() {
  let rows = 50;
  let columns = 10;

  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  const generateBoard = () => {
    let result: any = [];
    for (let i = 0; i < rows; i++) {
      result.push([]);
      for (let j = 0; j < columns; j++) {
        let key = uuidv4();
        result[i].push(
          <span key={key} onClick={() => console.log(key)}>
            <Node />
          </span>
        );
      }
    }

    console.log(result);
    return result;
  };

  return (
    <div className="board">
      <h2>Board</h2>
      <div className="board___nodeContainer">
        {generateBoard().map((item: Array<any>, i: number) => (
          <div className="rows" key={i}>
            {item.map((node, j) => node)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default board;

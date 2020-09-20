import React from "react";
import Node from "../Node/node";
import "./board.css";

function board() {
  let rows = 10;
  let columns = 10;

  const generateBoard = () => {};

  return (
    <div className="board">
      <h2>Board</h2>
      <Node />
    </div>
  );
}

export default board;

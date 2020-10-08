import React, { Component } from "react";
import { INodeProps } from "../../Utility/interfaces";

import "./node.css";

export default class Node extends Component<INodeProps, {}> {
  nodeType = (node: INodeProps): string => {
    const type = node.isEnd
      ? "node-end"
      : node.isStart
      ? "node-start"
      : node.isWall
      ? "node-wall"
      : " ";
    return type;
  };

  render() {
    const {
      col,
      row,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      weight,
    } = this.props;
    return (
      <div className="node-box">
        <div
          id={`node-${row}-${col}`}
          className={`node ${this.nodeType(this.props)}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}
        >
          <p>{weight}</p>
        </div>
      </div>
    );
  }
}

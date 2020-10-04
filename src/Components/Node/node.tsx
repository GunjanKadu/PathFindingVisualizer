import React from "react";
import { INodeProps } from "../../Utility/interfaces";
import "./node.css";

function Node(props: INodeProps) {
  const getNodeType = (props: INodeProps): string => {
    let type = "";
    if (props.isStart) type = "node__defaultStart";
    if (props.isEnd) type = "node__defaultEnd";
    if (props.isWall) type = "node__isWall";
    return type;
  };

  return (
    <div className="node__container">
      <div
        id={`node-${props.identifier}`}
        className={`node ${getNodeType(props)}`}
        onMouseDown={() => props.onMouseDown(props.row, props.column)}
        onMouseUp={() => props.onMouseUp()}
        onMouseEnter={() => props.onMouseEnter(props.row, props.column)}
      >
        {`${props.column}${props.row}`}
        {/* {props.weight} */}
      </div>
    </div>
  );
}

export default Node;

import React from "react";
import { INodeProps } from "../../Utility/interfaces";
import "./node.css";

function Node(props: INodeProps) {
  const getNodeType = (props: INodeProps): string => {
    let type;
    if (props.isStart) type = "node__defaultStart";
    if (props.isEnd) type = "node__defaultEnd";
    return `node ${type}`;
  };

  return <div className={getNodeType(props)}>{props.weight}</div>;
}

export default Node;

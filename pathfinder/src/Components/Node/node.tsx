import React from "react";
import { INodeProperties, INodeProps } from "../../Utility/interfaces";
import "./node.css";

function Node(props: INodeProps) {
  return <div className="node">{props.weight}</div>;
}

export default Node;

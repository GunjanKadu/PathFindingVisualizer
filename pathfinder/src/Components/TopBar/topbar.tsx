import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./topbar.css";
import { IHeader } from "../../Utility/interfaces";
import { ALGORITHM } from "../../Utility/constants";

/*
Controls menu for the pathfinding visualizer app.
*/
export default class Header extends Component<IHeader, {}> {
  render() {
    return (
      <div>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href=".">Pathfinding Algorithm Visualizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown
                title="Algorithms"
                id="basic-nav-dropdown"
                // disabled={this.props.visualized}
              >
                <NavDropdown.Item
                  href="#dijkstra"
                  className="my-dropdown-item"
                  onClick={() => this.props.changeAlgo(ALGORITHM.DIJKSTRA)}
                >
                  Djikstra's
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#bellman-ford"
                  className="my-dropdown-item"
                  // onClick={() => this.props.changeAlgo("Bellman-Ford")}
                >
                  Bellman-Ford
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#bfs"
                  className="my-dropdown-item"
                  // onClick={() => this.props.changeAlgo("BFS")}
                >
                  BFS
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#dfs"
                  className="my-dropdown-item"
                  // onClick={() => this.props.changeAlgo("DFS")}
                >
                  DFS
                </NavDropdown.Item>
              </NavDropdown>
              <Button
                className="non-visualize-button"
                // onClick={this.props.changeWeights}
                // disabled={this.props.visualized}
              >
                New Weights
              </Button>
              <Button
                className="visualize-it-button"
                onClick={this.props.startVisualizing}
                disabled={this.props.visualize}
              >
                Visualize It!
              </Button>
              <Button
                className="non-visualize-button"
                // onClick={this.props.clearBoard}
                // disabled={this.props.visualized}
              >
                Clear Board
              </Button>
              <NavDropdown
                title="Maze Algorithms"
                id="basic-nav-dropdown"
                className="my-dropdown"
                // disabled={this.props.visualized}
              >
                <NavDropdown.Item
                  href="#random"
                  className="my-dropdown-item"
                  onClick={() => {
                    // this.props.generateMaze("Random");
                  }}
                >
                  Random Walls
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#recursive-division"
                  className="my-dropdown-item"
                  onClick={() => {
                    // this.props.generateMaze("RecursiveDivision");
                  }}
                >
                  Recursive Division
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Speed"
                id="basic-nav-dropdown"
                className="my-dropdown"
                // disabled={this.props.visualized}
              >
                <NavDropdown.Item
                  href="#slow"
                  className="my-dropdown-item"
                  onClick={() => {
                    // this.props.changeSpeed("Slow");
                  }}
                >
                  Slow
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#average"
                  className="my-dropdown-item"
                  onClick={() => {
                    // this.props.changeSpeed("Average");
                  }}
                >
                  Average
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#fast"
                  className="my-dropdown-item"
                  onClick={() => {
                    // this.props.changeSpeed("Fast");
                  }}
                >
                  Fast
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

import { IGrid } from "../interfaces";

/* Generates a maze of random walls. */
export function randomWalls(grid: IGrid) {
  for (let row = 0; row < 19; row++) {
    for (let col = 0; col < 49; col++) {
      let decider = Math.random();
      if (
        (decider <= 0.1 || decider >= 0.85) &&
        !grid.grid[row][col].isStart &&
        !grid.grid[row][col].isEnd
      ) {
        grid.toggleWall(row, col);
      }
    }
  }
}

/* The below methods are used to generate a maze with
the recursive dvision method.*/

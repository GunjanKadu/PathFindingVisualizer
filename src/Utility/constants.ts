export const DEFAULT_COLUMNS = 35;
export const DEFAULT_ROWS = 13;
export const DEFAULT_START = [6, 5];
export const DEFAULT_END = [6, 29];
export const ALGORITHM = {
  DIJKSTRA: "Dijkstra",
  BFS: "Bfs",
  DFS: "Dfs",
};
export const uuidv4 = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

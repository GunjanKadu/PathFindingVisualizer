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
export class DefaultRowsAndColums {
  static DefaultRows: number = 13;
  static DefaultColumns: number = 35;

  static setRoworColumn(value: number, type: string) {
    if (type === "rows") DefaultRowsAndColums.DefaultRows = value;
    if (type === "columns") DefaultRowsAndColums.DefaultColumns = value;
  }
}

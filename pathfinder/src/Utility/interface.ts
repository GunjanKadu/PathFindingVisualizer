export interface IGrid {
  generateBoard: (
    rows: number,
    columns: number
  ) => Array<Array<INodeProperties>>;
  addPropertiesToNode: (column: number, row: number) => INodeProperties;
  grid: Array<Array<INodeProperties>>;
}
export interface INodeProperties {
  column: number;
  row: number;
  weight: number;
  key: string;
}

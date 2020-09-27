import { constants } from "buffer";
export const DEFAULT_COLUMNS = 50;
export const DEFAULT_ROWS = 19;
export const DEFAULT_START = [8, 9];
export const DEFAULT_END = [8, 39];

export const uuidv4 = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

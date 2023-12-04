import { OkvedItem } from "./OkvedItem";
import type { IOkvedItem } from "./OkvedItem";

export const prepareOkvedItems = (rows: string[][]): IOkvedItem[] => {
  return rows.map((row) => {
    const [section = "", code = "", name = ""] = row;
    return new OkvedItem(section, code, name);
  });
};

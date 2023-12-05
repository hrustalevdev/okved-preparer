import fs from "fs";
import { buildOkvedTreeFromCsv } from "./buildOkvedTreeFromCsv";
import { decodeWin1251 } from "./decodeWin1251";
import type { IOkvedItem } from "./OkvedItem";
import { parseCsvString } from "./parseCsvString";
import { prepareOkvedItems } from "./prepareOkvedItems";

export interface IJsonOkvedCreatorOptions {
  csvPath: string;
  jsonSavingPaths: {
    flat: string;
    tree: string;
  };
}

export class JsonOkvedCreator {
  flat: IOkvedItem[];
  tree: IOkvedItem[];

  create() {
    const jsonFlat = JSON.stringify(this.flat, null, 2);
    const jsonTree = JSON.stringify(this.tree, null, 2);

    try {
      fs.writeFileSync(this._jsonFlatPath, jsonFlat, "utf-8");
      fs.writeFileSync(this._jsonTreePath, jsonTree, "utf-8");
      console.log("Данные успешно записаны в файл:", this._jsonFlatPath);
      console.log("Данные успешно записаны в файл:", this._jsonTreePath);
    } catch (error) {
      console.error("Ошибка при записи данных в файл:", error);
    }
  }

  constructor(options: IJsonOkvedCreatorOptions) {
    const { csvPath, jsonSavingPaths } = options;
    this._jsonFlatPath = jsonSavingPaths.flat;
    this._jsonTreePath = jsonSavingPaths.tree;

    const str = decodeWin1251(csvPath);
    const rows = parseCsvString(str);

    this.flat = prepareOkvedItems(rows);
    this.tree = buildOkvedTreeFromCsv(csvPath);
  }

  private readonly _jsonFlatPath: string;
  private readonly _jsonTreePath: string;
}

import fs from "fs";
import { buildOkvedTreeFromCsv } from "./buildOkvedTreeFromCsv";
import { decodeWin1251 } from "./decodeWin1251";
import { EOkvedType, IOkvedItem } from "./OkvedItem";
import { parseCsvString } from "./parseCsvString";
import { prepareOkvedItems } from "./prepareOkvedItems";

export interface IJsonOkvedCreatorOptions {
  csvPath: string;
  jsonSavingPaths: {
    flat: string;
    tree: string;
    treeFromLevel?: string;
  };

  /** Если указан, то дополнительно будет создан файл древовидной структуры, начинающейся с данного уровня */
  level?: EOkvedType;
}

export class JsonOkvedCreator {
  flat: IOkvedItem[];
  tree: IOkvedItem[];
  treeFromLevel?: IOkvedItem[];

  create() {
    const jsonFlat = JSON.stringify(this.flat, null, 2);
    const jsonTree = JSON.stringify(this.tree, null, 2);

    try {
      fs.writeFileSync(this._jsonFlatPath, jsonFlat, "utf-8");
      fs.writeFileSync(this._jsonTreePath, jsonTree, "utf-8");
      console.log("Данные успешно записаны в файл:", this._jsonFlatPath);
      console.log("Данные успешно записаны в файл:", this._jsonTreePath);

      if (this.treeFromLevel && this._jsonTreeFromLevelPath) {
        const jsonTreeFromLevel = JSON.stringify(this.treeFromLevel, null, 2);

        fs.writeFileSync(
          this._jsonTreeFromLevelPath,
          jsonTreeFromLevel,
          "utf-8",
        );
        console.log(
          "Данные успешно записаны в файл:",
          this._jsonTreeFromLevelPath,
        );
      }
    } catch (error) {
      console.error("Ошибка при записи данных в файл:", error);
    }
  }

  constructor(options: IJsonOkvedCreatorOptions) {
    const { csvPath, jsonSavingPaths, level } = options;
    this._jsonFlatPath = jsonSavingPaths.flat;
    this._jsonTreePath = jsonSavingPaths.tree;
    this._jsonTreeFromLevelPath = jsonSavingPaths.treeFromLevel;

    const str = decodeWin1251(csvPath);
    const rows = parseCsvString(str);

    this.flat = prepareOkvedItems(rows);
    this.tree = buildOkvedTreeFromCsv(csvPath);

    if (level) {
      this.treeFromLevel = buildOkvedTreeFromCsv(csvPath, level);
    }
  }

  private readonly _jsonFlatPath: string;
  private readonly _jsonTreePath: string;
  private readonly _jsonTreeFromLevelPath?: string;
}

import path from "path";
import { getCsvFilePath } from "./lib/getCsvFilePath";
import {
  IJsonOkvedCreatorOptions,
  JsonOkvedCreator,
} from "./lib/JsonOkvedCreator";
import { EOkvedType } from "./lib/OkvedItem";

const ioDirPath = path.resolve(__dirname, "IO");
const csvPath = getCsvFilePath(ioDirPath);

class Options implements IJsonOkvedCreatorOptions {
  csvPath: string;
  jsonSavingPaths: {
    flat: string;
    tree: string;
    treeFromLevel?: string;
  };
  level?: EOkvedType;

  /**
   * @param level - Если указан, то дополнительно будет создан файл древовидной структуры, начинающейся с данного уровня.
   */
  constructor(level?: EOkvedType) {
    this.csvPath = getCsvFilePath(ioDirPath) || "";
    this.jsonSavingPaths = {
      flat: path.resolve(__dirname, "IO", "okved2Flat.json"),
      tree: path.resolve(__dirname, "IO", "okved2Tree.json"),
      treeFromLevel:
        level ?
          path.resolve(__dirname, "IO", `okved2TreeFrom${level}.json`)
        : undefined,
    };
    this.level = level;
  }
}

if (csvPath) {
  const jsonOkvedCreator = new JsonOkvedCreator(new Options(EOkvedType.Class));
  jsonOkvedCreator.create();
}

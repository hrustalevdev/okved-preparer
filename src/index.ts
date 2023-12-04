import path from "path";
import { getCsvFilePath } from "./lib/getCsvFilePath";
import { JsonOkvedCreator } from "./lib/JsonOkvedCreator";
import type { IJsonOkvedCreatorOptions } from "./lib/JsonOkvedCreator";

const ioDirPath = path.resolve(__dirname, "IO");
const csvPath = getCsvFilePath(ioDirPath);

if (csvPath) {
  const options: IJsonOkvedCreatorOptions = {
    csvPath,
    jsonSavingPaths: {
      flat: path.resolve(__dirname, "IO", "okved2Flat.json"),
      tree: path.resolve(__dirname, "IO", "okved2Tree.json"),
    },
  };

  const jsonOkvedCreator = new JsonOkvedCreator(options);
  jsonOkvedCreator.create();
}

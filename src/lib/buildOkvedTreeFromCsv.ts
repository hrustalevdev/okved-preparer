import { decodeWin1251 } from "./decodeWin1251";
import { parseCsvString } from "./parseCsvString";
import { prepareOkvedItems } from "./prepareOkvedItems";
import type { IOkvedItem } from "./OkvedItem";

/**
 * @param path - путь к csv-файлу
 */
export const buildOkvedTreeFromCsv = (path: string) => {
  const tree: IOkvedItem[] = [];
  const idMap = new Map<string, IOkvedItem>();
  const str = decodeWin1251(path);
  const rows = parseCsvString(str);
  const okvedItems = prepareOkvedItems(rows);

  okvedItems.forEach((item) => idMap.set(item.id, item));

  okvedItems.forEach((item) => {
    const parentId = item.parentId;

    /** Если у элемента есть родитель, добавляем его к родителю */
    if (parentId && idMap.has(parentId)) {
      const parentItem = idMap.get(parentId);
      parentItem?.addChild(item);
    } else {
      /** Если у элемента нет родителя, добавляем его в корень дерева */
      tree.push(item);
    }
  });

  return tree;
};

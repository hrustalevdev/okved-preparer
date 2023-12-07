import { decodeWin1251 } from "./decodeWin1251";
import { parseCsvString } from "./parseCsvString";
import { prepareOkvedItems } from "./prepareOkvedItems";
import { EOkvedType, IOkvedItem } from "./OkvedItem";

/**
 * @param path - путь к csv-файлу
 * @param level - с какого уровня начинать построение дерева
 */
export const buildOkvedTreeFromCsv = (
  path: string,
  level: EOkvedType = EOkvedType.Section,
) => {
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
    }

    /** Построение дерева начинаем с указанного уровня */
    if (item.type === level) {
      tree.push(item);
    }
  });

  return tree;
};

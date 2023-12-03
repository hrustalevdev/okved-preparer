import fs from "fs";
import iconv from "iconv-lite";

/**
 * Декодирует csv-файл из кодировки win1251 в utf-8
 * @param path - путь к исходному файлу
 * @returns строка в кодировке utf-8
 */
export const decodeWin1251 = (path: string): string => {
  return iconv.decode(fs.readFileSync(path), "win1251");
};

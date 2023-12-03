import { parse } from "csv-parse/sync";

/**
 * Возвращает массив массивов строк, полученных из CSV строки
 * @example
 * [['section', 'code', 'name'],
 *   ['A', '01.2', 'Выращивание многолетних культур'],
 *   ['A', '01.21', 'Выращивание винограда']]
 */
export const parseCsvString = (csvString: string): string[][] => {
  return parse(csvString, {
    bom: true,
    delimiter: ";",
    trim: true,
    skip_empty_lines: true,
  });
};

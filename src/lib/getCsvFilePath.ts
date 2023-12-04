import * as fs from "fs";
import * as path from "path";

export const getCsvFilePath = (directoryPath: string): string | null => {
  try {
    const files = fs.readdirSync(directoryPath);

    /** Ищем первый файл с расширением .csv */
    const csvFile = files.find((file) => path.extname(file) === ".csv");

    if (csvFile) {
      /** Возвращаем полный путь до файла */
      return path.join(directoryPath, csvFile);
    } else {
      console.log("В указанной папке нет файлов с расширением .csv");
      return null;
    }
  } catch (error) {
    console.error("Ошибка при чтении директории:", error);
    return null;
  }
};

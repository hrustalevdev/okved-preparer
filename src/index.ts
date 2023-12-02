import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import iconv from 'iconv-lite';
import util from 'util';

interface CsvRecord {
  section: string;
  code: string;
  name: string;
}

const inputFile = path.resolve(__dirname, 'csv', 'okved2_1251.csv');
const str = iconv.decode(fs.readFileSync(inputFile), 'win1251');
// const records = parse(str, {
//   bom: true,
//   delimiter: ';',
//   trim: true,
//   skip_empty_lines: true,
// })
console.log('>>>RECORDS: ', str);

// // Создаем объект Readable стрима для чтения файла
// const inputStream = fs.createReadStream(inputFile);
//
// // Создаем объект Transform стрима для преобразования данных в UTF-8
// const utfConverter = iconv.decodeStream('win1251');
//
// const parseOptions = {
//   bom: true,
//   delimiter: ';',
//   trim: true,
//   skip_empty_lines: true,
// };
//
// const csvParser = parse(parseOptions);
//
// const data: CsvRecord[] = [];
//
// // Подключаем стримы: чтение из файла и преобразование в UTF-8
// inputStream
//   .pipe(utfConverter)
//   .pipe(csvParser)
//   .on('data', (record) => {
//     const [section, code, name] = record;
//
//     // Добавить класс, собирающий нужный объект
//     data.push({section, code, name});
//   })
//   .on('end', () => {
//     // Сохранить результат в json файл
//     // console.log(`Reading and decoding finished. ${util.inspect(data, {depth: null})}`);
//   })
//   .on('error', (error) => {
//     console.error(`Error: ${error.message}`);
//   });

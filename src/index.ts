import fs from "fs";
import path from "path";
import iconv from "iconv-lite";

const inputFile = path.resolve(__dirname, "csv", "okved2_1251.csv");
const str = iconv.decode(fs.readFileSync(inputFile), "win1251");
console.log(">>>RECORDS: ", str);

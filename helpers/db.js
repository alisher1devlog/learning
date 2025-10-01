import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "db");


async function readData(fileName) {
    const filePath = path.join(dbPath, fileName);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

async function writeData(fileName, data) {
    const filePath = path.join(dbPath, fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

}

export const db = {
    read: readData,
    write: writeData
}
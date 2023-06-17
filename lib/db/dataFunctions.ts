import mongoController from "../mongodb/controllers/mongoController";
import fs from 'fs'
import { join } from 'path'

const getDirSize = (dirPath: string) => {
  let size = 0;
  const files = fs.readdirSync(dirPath);

  for (let i = 0; i < files.length; i++) {
    const filePath = join(dirPath, files[i]);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      size += stats.size;
    } else if (stats.isDirectory()) {
      size += getDirSize(filePath);
    }
  }

  return size;
};

export default async function getSizeOfData() {
  const path = join(process.cwd(), '/public', '/uploads');
  const sizeOfImg = getDirSize(path);
  const data = await mongoController.getSizeOfDatabase();
  const sizeOfTortaCMS = getDirSize(process.cwd()) - sizeOfImg;
  const total = sizeOfImg + data.categoryCollection + data.postCollection + data.userCollection + sizeOfTortaCMS;
  
  return {
    sizeOfImg,
    mongoSize: data,
    total,
    sizeOfTortaCMS
  }
}
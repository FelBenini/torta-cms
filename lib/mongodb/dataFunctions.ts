import mongoController from "./controllers/mongoController";

export default async function getSizeOfData() {
  const data = await mongoController.getSizeOfDatabase();
  const total = data.categoryCollection + data.postCollection + data.userCollection + data.imageCollection;
  
  return {
    sizeOfImg: data.imageCollection,
    mongoSize: data,
    total,
  }
}
import data from './data.json';
import { Branch } from '../../components/branches/schemas';

export const branches = async (): Promise<Array<Object>> => {
  const docs: Array<Object> = await Branch.insertMany(data);

  await Branch.createIndexes();

  return docs;
};

export const checkIfCollectionIsEmptyAndPopulate = async (): Promise<void> => {
  const docCount = await Branch.collection.conn.db
    .collection(Branch.collection.name)
    .countDocuments();

  if (docCount === 0) {
    await branches();
  }
};

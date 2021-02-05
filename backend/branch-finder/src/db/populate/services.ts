import data from './data.json';
import { Branch } from '../../components/branches/schemas';

export const branches = async (): Promise<Array<Object>> => {
  await Branch.validate(data);

  const docs: Array<Object> = await Branch.insertMany(data);

  await Branch.createIndexes({ location: '2dsphere' });

  return docs;
};

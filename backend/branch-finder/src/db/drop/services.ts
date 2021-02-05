import { Branch } from '../../components/branches/schemas';

export const branches = async (): Promise<Array<Object>> =>
  Branch.collection.drop();

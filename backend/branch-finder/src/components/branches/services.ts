import { Branch } from './schemas';

class BranchServices {
  public async getAll(): Promise<Array<Object>> {
    const branches = await Branch.find(
      {},
      {
        _id: 0,
        __v: 0,
      }
    );

    return branches;
  }

  public async getNearest(
    longitude: number,
    latitude: number
  ): Promise<Object | null> {
    const branch = await Branch.findOne(
      {
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          },
        },
      },
      {
        _id: 0,
        __v: 0,
      }
    );

    return branch;
  }
}

export default new BranchServices();

import { IUniversity } from '@/shared/model/university.model';

import { ScienceDegree } from '@/shared/model/enumerations/science-degree.model';
export interface IUserToUniversity {
  id?: number;
  scienceDegree?: ScienceDegree | null;
  universityId?: IUniversity | null;
}

export class UserToUniversity implements IUserToUniversity {
  constructor(public id?: number, public scienceDegree?: ScienceDegree | null, public universityId?: IUniversity | null) {}
}

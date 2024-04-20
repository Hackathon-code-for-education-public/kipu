import { IUniversity } from '@/shared/model/university.model';
import { IDirection } from '@/shared/model/direction.model';
import { IProfile } from '@/shared/model/profile.model';

export interface IAdmission {
  id?: number;
  university?: IUniversity | null;
  direction?: IDirection | null;
  profile?: IProfile | null;
}

export class Admission implements IAdmission {
  constructor(
    public id?: number,
    public university?: IUniversity | null,
    public direction?: IDirection | null,
    public profile?: IProfile | null
  ) {}
}

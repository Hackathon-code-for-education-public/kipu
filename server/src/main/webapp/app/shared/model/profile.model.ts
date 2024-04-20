import { IUserToUniversity } from '@/shared/model/user-to-university.model';
import { IImage } from '@/shared/model/image.model';
import { IAdmission } from '@/shared/model/admission.model';
import { IFiles } from '@/shared/model/files.model';

export interface IProfile {
  id?: number;
  fullName?: string | null;
  phoneNumber?: string | null;
  description?: string | null;
  rating?: number | null;
  userId?: IUserToUniversity | null;
  avatar?: IImage | null;
  admissions?: IAdmission[] | null;
  files?: IFiles[] | null;
}

export class Profile implements IProfile {
  constructor(
    public id?: number,
    public fullName?: string | null,
    public phoneNumber?: string | null,
    public description?: string | null,
    public rating?: number | null,
    public userId?: IUserToUniversity | null,
    public avatar?: IImage | null,
    public admissions?: IAdmission[] | null,
    public files?: IFiles[] | null
  ) {}
}

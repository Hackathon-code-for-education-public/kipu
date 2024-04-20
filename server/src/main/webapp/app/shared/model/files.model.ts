import { IUniversity } from '@/shared/model/university.model';
import { IProfile } from '@/shared/model/profile.model';

import { FileType } from '@/shared/model/enumerations/file-type.model';
export interface IFiles {
  id?: number;
  url?: string | null;
  type?: FileType | null;
  description?: string | null;
  university?: IUniversity | null;
  profile?: IProfile | null;
}

export class Files implements IFiles {
  constructor(
    public id?: number,
    public url?: string | null,
    public type?: FileType | null,
    public description?: string | null,
    public university?: IUniversity | null,
    public profile?: IProfile | null
  ) {}
}

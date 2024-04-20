import { IImage } from '@/shared/model/image.model';
import { IProfile } from '@/shared/model/profile.model';
import { IUniversity } from '@/shared/model/university.model';

export interface IComment {
  id?: number;
  content?: string | null;
  rate?: number | null;
  images?: IImage[] | null;
  user?: IProfile | null;
  university?: IUniversity | null;
}

export class Comment implements IComment {
  constructor(
    public id?: number,
    public content?: string | null,
    public rate?: number | null,
    public images?: IImage[] | null,
    public user?: IProfile | null,
    public university?: IUniversity | null
  ) {}
}

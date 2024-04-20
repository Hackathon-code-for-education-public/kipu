import { IUniversity } from '@/shared/model/university.model';

export interface IAlbum {
  id?: number;
  name?: string | null;
  university?: IUniversity | null;
}

export class Album implements IAlbum {
  constructor(public id?: number, public name?: string | null, public university?: IUniversity | null) {}
}

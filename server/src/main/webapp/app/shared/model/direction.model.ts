import { IEntrySubject } from '@/shared/model/entry-subject.model';
import { IUniversity } from '@/shared/model/university.model';

export interface IDirection {
  id?: number;
  name?: string | null;
  disciplines?: IEntrySubject[] | null;
  university?: IUniversity | null;
}

export class Direction implements IDirection {
  constructor(
    public id?: number,
    public name?: string | null,
    public disciplines?: IEntrySubject[] | null,
    public university?: IUniversity | null
  ) {}
}

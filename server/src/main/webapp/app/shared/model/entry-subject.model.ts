import { IDirection } from '@/shared/model/direction.model';

export interface IEntrySubject {
  id?: number;
  name?: string | null;
  minimumScore?: number | null;
  examDate?: Date | null;
  direction?: IDirection | null;
}

export class EntrySubject implements IEntrySubject {
  constructor(
    public id?: number,
    public name?: string | null,
    public minimumScore?: number | null,
    public examDate?: Date | null,
    public direction?: IDirection | null
  ) {}
}

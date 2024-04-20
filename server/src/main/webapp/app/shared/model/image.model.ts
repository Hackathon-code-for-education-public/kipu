import { IComment } from '@/shared/model/comment.model';
import { IUniversity } from '@/shared/model/university.model';
import { IProduct } from '@/shared/model/product.model';

export interface IImage {
  id?: number;
  imageURL?: string | null;
  date?: Date | null;
  comment?: IComment | null;
  university?: IUniversity | null;
  product?: IProduct | null;
}

export class Image implements IImage {
  constructor(
    public id?: number,
    public imageURL?: string | null,
    public date?: Date | null,
    public comment?: IComment | null,
    public university?: IUniversity | null,
    public product?: IProduct | null
  ) {}
}

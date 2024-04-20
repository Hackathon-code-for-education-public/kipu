import { IImage } from '@/shared/model/image.model';
import { IUniversity } from '@/shared/model/university.model';

export interface IProduct {
  id?: number;
  name?: string | null;
  price?: number | null;
  description?: string | null;
  images?: IImage[] | null;
  university?: IUniversity | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string | null,
    public price?: number | null,
    public description?: string | null,
    public images?: IImage[] | null,
    public university?: IUniversity | null
  ) {}
}

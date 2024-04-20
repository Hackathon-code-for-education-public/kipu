import { IUserToUniversity } from '@/shared/model/user-to-university.model';
import { IProduct } from '@/shared/model/product.model';
import { IImage } from '@/shared/model/image.model';
import { IComment } from '@/shared/model/comment.model';
import { IAlbum } from '@/shared/model/album.model';
import { IFiles } from '@/shared/model/files.model';
import { IDirection } from '@/shared/model/direction.model';

export interface IUniversity {
  id?: number;
  name?: string | null;
  desciption?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  site?: string | null;
  phoneNumbers?: string | null;
  emails?: string | null;
  schedule?: string | null;
  responsiblePerson?: string | null;
  id?: IUserToUniversity | null;
  products?: IProduct[] | null;
  images?: IImage[] | null;
  comments?: IComment[] | null;
  albums?: IAlbum[] | null;
  files?: IFiles[] | null;
  directions?: IDirection[] | null;
}

export class University implements IUniversity {
  constructor(
    public id?: number,
    public name?: string | null,
    public desciption?: string | null,
    public address?: string | null,
    public phoneNumber?: string | null,
    public email?: string | null,
    public site?: string | null,
    public phoneNumbers?: string | null,
    public emails?: string | null,
    public schedule?: string | null,
    public responsiblePerson?: string | null,
    public id?: IUserToUniversity | null,
    public products?: IProduct[] | null,
    public images?: IImage[] | null,
    public comments?: IComment[] | null,
    public albums?: IAlbum[] | null,
    public files?: IFiles[] | null,
    public directions?: IDirection[] | null
  ) {}
}

import { EntityRepository, Repository } from 'typeorm';
import { Image } from '../domain/image.entity';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {}

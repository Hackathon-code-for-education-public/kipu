import { EntityRepository, Repository } from 'typeorm';
import { Direction } from '../domain/direction.entity';

@EntityRepository(Direction)
export class DirectionRepository extends Repository<Direction> {}

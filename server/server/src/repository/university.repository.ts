import { EntityRepository, Repository } from 'typeorm';
import { University } from '../domain/university.entity';

@EntityRepository(University)
export class UniversityRepository extends Repository<University> {}

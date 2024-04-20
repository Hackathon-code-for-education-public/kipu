import { EntityRepository, Repository } from 'typeorm';
import { UserToUniversity } from '../domain/user-to-university.entity';

@EntityRepository(UserToUniversity)
export class UserToUniversityRepository extends Repository<UserToUniversity> {}

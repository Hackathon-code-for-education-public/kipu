import { EntityRepository, Repository } from 'typeorm';
import { EntrySubject } from '../domain/entry-subject.entity';

@EntityRepository(EntrySubject)
export class EntrySubjectRepository extends Repository<EntrySubject> {}

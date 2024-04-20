import { EntityRepository, Repository } from 'typeorm';
import { Admission } from '../domain/admission.entity';

@EntityRepository(Admission)
export class AdmissionRepository extends Repository<Admission> {}

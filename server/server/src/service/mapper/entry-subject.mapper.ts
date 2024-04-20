import { EntrySubject } from '../../domain/entry-subject.entity';
import { EntrySubjectDTO } from '../dto/entry-subject.dto';

/**
 * A EntrySubject mapper object.
 */
export class EntrySubjectMapper {
    static fromDTOtoEntity(entityDTO: EntrySubjectDTO): EntrySubject {
        if (!entityDTO) {
            return;
        }
        let entity = new EntrySubject();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: EntrySubject): EntrySubjectDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new EntrySubjectDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

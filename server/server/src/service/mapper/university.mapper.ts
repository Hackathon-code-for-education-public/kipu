import { University } from '../../domain/university.entity';
import { UniversityDTO } from '../dto/university.dto';

/**
 * A University mapper object.
 */
export class UniversityMapper {
    static fromDTOtoEntity(entityDTO: UniversityDTO): University {
        if (!entityDTO) {
            return;
        }
        let entity = new University();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: University): UniversityDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new UniversityDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

import { Admission } from '../../domain/admission.entity';
import { AdmissionDTO } from '../dto/admission.dto';

/**
 * A Admission mapper object.
 */
export class AdmissionMapper {
    static fromDTOtoEntity(entityDTO: AdmissionDTO): Admission {
        if (!entityDTO) {
            return;
        }
        const entity = new Admission();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Admission): AdmissionDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new AdmissionDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

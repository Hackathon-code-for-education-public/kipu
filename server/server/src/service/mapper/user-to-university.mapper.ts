import { UserToUniversity } from '../../domain/user-to-university.entity';
import { UserToUniversityDTO } from '../dto/user-to-university.dto';

/**
 * A UserToUniversity mapper object.
 */
export class UserToUniversityMapper {
    static fromDTOtoEntity(entityDTO: UserToUniversityDTO): UserToUniversity {
        if (!entityDTO) {
            return;
        }
        const entity = new UserToUniversity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: UserToUniversity): UserToUniversityDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new UserToUniversityDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

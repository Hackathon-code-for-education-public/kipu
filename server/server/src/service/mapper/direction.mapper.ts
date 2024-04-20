import { Direction } from '../../domain/direction.entity';
import { DirectionDTO } from '../dto/direction.dto';

/**
 * A Direction mapper object.
 */
export class DirectionMapper {
    static fromDTOtoEntity(entityDTO: DirectionDTO): Direction {
        if (!entityDTO) {
            return;
        }
        let entity = new Direction();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Direction): DirectionDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new DirectionDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

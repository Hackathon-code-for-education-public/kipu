import { Image } from '../../domain/image.entity';
import { ImageDTO } from '../dto/image.dto';

/**
 * A Image mapper object.
 */
export class ImageMapper {
    static fromDTOtoEntity(entityDTO: ImageDTO): Image {
        if (!entityDTO) {
            return;
        }
        let entity = new Image();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Image): ImageDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ImageDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

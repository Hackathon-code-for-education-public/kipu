/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { ImageDTO } from './image.dto';
import { UniversityDTO } from './university.dto';

/**
 * A ProductDTO object.
 */
export class ProductDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'price field', required: false })
    price: number;

    @ApiModelProperty({ description: 'description field', required: false })
    description: string;

    @ApiModelProperty({ type: ImageDTO, isArray: true, description: 'images relationship' })
    images: ImageDTO[];

    @ApiModelProperty({ type: UniversityDTO, description: 'university relationship' })
    university: UniversityDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

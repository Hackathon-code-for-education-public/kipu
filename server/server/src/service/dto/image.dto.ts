/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { CommentDTO } from './comment.dto';
import { UniversityDTO } from './university.dto';
import { ProductDTO } from './product.dto';

/**
 * A ImageDTO object.
 */
export class ImageDTO extends BaseDTO {
    @ApiModelProperty({ description: 'imageURL field', required: false })
    imageURL: string;

    @ApiModelProperty({ description: 'date field', required: false })
    date: any;

    @ApiModelProperty({ type: CommentDTO, description: 'comment relationship' })
    comment: CommentDTO;

    @ApiModelProperty({ type: UniversityDTO, description: 'university relationship' })
    university: UniversityDTO;

    @ApiModelProperty({ type: ProductDTO, description: 'product relationship' })
    product: ProductDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

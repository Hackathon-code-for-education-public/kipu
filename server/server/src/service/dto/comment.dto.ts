/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { ImageDTO } from './image.dto';
import { ProfileDTO } from './profile.dto';
import { UniversityDTO } from './university.dto';

/**
 * A CommentDTO object.
 */
export class CommentDTO extends BaseDTO {
    @ApiModelProperty({ description: 'content field', required: false })
    content: string;

    @ApiModelProperty({ description: 'rate field', required: false })
    rate: number;

    @ApiModelProperty({ type: ImageDTO, isArray: true, description: 'images relationship' })
    images: ImageDTO[];

    @ApiModelProperty({ type: ProfileDTO, description: 'user relationship' })
    user: ProfileDTO;

    @ApiModelProperty({ type: UniversityDTO, description: 'university relationship' })
    university: UniversityDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

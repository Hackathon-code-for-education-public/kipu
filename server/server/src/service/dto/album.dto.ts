/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { UniversityDTO } from './university.dto';

/**
 * A AlbumDTO object.
 */
export class AlbumDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ type: UniversityDTO, description: 'university relationship' })
    university: UniversityDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

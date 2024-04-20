/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { UniversityDTO } from './university.dto';
import { ScienceDegree } from '../../domain/enumeration/science-degree';

/**
 * A UserToUniversityDTO object.
 */
export class UserToUniversityDTO extends BaseDTO {
    @ApiModelProperty({ enum: ScienceDegree, description: 'scienceDegree enum field', required: false })
    scienceDegree: ScienceDegree;

    @ApiModelProperty({ type: UniversityDTO, description: 'universityId relationship' })
    universityId: UniversityDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

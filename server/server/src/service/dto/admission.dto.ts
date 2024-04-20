/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { UniversityDTO } from './university.dto';
import { DirectionDTO } from './direction.dto';
import { ProfileDTO } from './profile.dto';

/**
 * A AdmissionDTO object.
 */
export class AdmissionDTO extends BaseDTO {
    @ApiModelProperty({ type: UniversityDTO, description: 'university relationship' })
    university: UniversityDTO;

    @ApiModelProperty({ type: DirectionDTO, description: 'direction relationship' })
    direction: DirectionDTO;

    @ApiModelProperty({ type: ProfileDTO, description: 'profile relationship' })
    profile: ProfileDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

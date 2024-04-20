/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { EntrySubjectDTO } from './entry-subject.dto';
import { UniversityDTO } from './university.dto';

/**
 * A DirectionDTO object.
 */
export class DirectionDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ type: EntrySubjectDTO, isArray: true, description: 'disciplines relationship' })
    disciplines: EntrySubjectDTO[];

    @ApiModelProperty({ type: UniversityDTO, description: 'university relationship' })
    university: UniversityDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

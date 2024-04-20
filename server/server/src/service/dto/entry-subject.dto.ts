/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { DirectionDTO } from './direction.dto';

/**
 * A EntrySubjectDTO object.
 */
export class EntrySubjectDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'minimumScore field', required: false })
    minimumScore: number;

    @ApiModelProperty({ description: 'examDate field', required: false })
    examDate: any;

    @ApiModelProperty({ type: DirectionDTO, description: 'direction relationship' })
    direction: DirectionDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

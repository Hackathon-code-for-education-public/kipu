/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { UniversityDTO } from './university.dto';
import { ProfileDTO } from './profile.dto';
import { FileType } from '../../domain/enumeration/file-type';
import {PointsDTO} from "./points.dto";

/**
 * A FilesDTO object.
 */
export class FilesDTO extends BaseDTO {
    @ApiModelProperty({ description: 'url field', required: false })
    url: string;

    @ApiModelProperty({ enum: FileType, description: 'type enum field', required: false })
    type: FileType;

    @ApiModelProperty({ description: 'description field', required: false })
    description: string;

    @ApiModelProperty({ type: UniversityDTO, description: 'university relationship' })
    university: UniversityDTO;

    @ApiModelProperty({ type: ProfileDTO, description: 'profile relationship' })
    profile: ProfileDTO;

    @ApiModelProperty({ type: ProfileDTO, description: 'profile relationship' })
    points: PointsDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

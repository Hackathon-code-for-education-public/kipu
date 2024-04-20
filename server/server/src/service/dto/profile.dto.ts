/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { UserToUniversityDTO } from './user-to-university.dto';
import { ImageDTO } from './image.dto';
import { AdmissionDTO } from './admission.dto';
import { FilesDTO } from './files.dto';

/**
 * A ProfileDTO object.
 */
export class ProfileDTO extends BaseDTO {
    @ApiModelProperty({ description: 'fullName field', required: false })
    fullName: string;

    @ApiModelProperty({ description: 'phoneNumber field', required: false })
    phoneNumber: string;

    @ApiModelProperty({ description: 'description field', required: false })
    description: string;

    @ApiModelProperty({ description: 'rating field', required: false })
    rating: number;

    @ApiModelProperty({ type: UserToUniversityDTO, description: 'userId relationship' })
    userId: UserToUniversityDTO;

    @ApiModelProperty({ type: ImageDTO, description: 'avatar relationship' })
    avatar: ImageDTO;

    @ApiModelProperty({ type: AdmissionDTO, isArray: true, description: 'admissions relationship' })
    admissions: AdmissionDTO[];

    @ApiModelProperty({ type: FilesDTO, isArray: true, description: 'files relationship' })
    files: FilesDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

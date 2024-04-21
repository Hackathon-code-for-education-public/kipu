/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { UniversityDTO } from './university.dto';
import { ProfileDTO } from './profile.dto';
import { FileType } from '../../domain/enumeration/file-type';
import {Column, ManyToOne} from "typeorm";
import {Files} from "../../domain/files.entity";
import {FilesDTO} from "./files.dto";

/**
 * A FilesDTO object.
 */
export class PointsDTO extends BaseDTO {
  @ApiModelProperty({ description: 'type enum field', required: false })
  type: string

  @ApiModelProperty({ description: 'type enum field', required: false })
  yaw: number

  @ApiModelProperty({ description: 'type enum field', required: false })
  pitch: number

  @ApiModelProperty({ description: 'type enum field', required: false })

  @ApiModelProperty({ description: 'type enum field', required: false })
  text: string

  @ApiModelProperty({ description: 'type enum field', required: false })
  foreignProjectionIndex: number

  @ApiModelProperty({ description: 'type enum field', required: false })
  file: FilesDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

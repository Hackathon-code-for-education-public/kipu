/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { UserToUniversityDTO } from './user-to-university.dto';
import { ProductDTO } from './product.dto';
import { ImageDTO } from './image.dto';
import { CommentDTO } from './comment.dto';
import { AlbumDTO } from './album.dto';
import { FilesDTO } from './files.dto';
import { DirectionDTO } from './direction.dto';

/**
 * A UniversityDTO object.
 */
export class UniversityDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'desciption field', required: false })
    desciption: string;

    @ApiModelProperty({ description: 'address field', required: false })
    address: string;

    @ApiModelProperty({ description: 'phoneNumber field', required: false })
    phoneNumber: string;

    @ApiModelProperty({ description: 'email field', required: false })
    email: string;

    @ApiModelProperty({ description: 'site field', required: false })
    site: string;

    @ApiModelProperty({ description: 'phoneNumbers field', required: false })
    phoneNumbers: string;

    @ApiModelProperty({ description: 'emails field', required: false })
    emails: string;

    @ApiModelProperty({ description: 'schedule field', required: false })
    schedule: string;

    @ApiModelProperty({ description: 'responsiblePerson field', required: false })
    responsiblePerson: string;

    @ApiModelProperty({ type: UserToUniversityDTO, description: 'id relationship' })
    id: UserToUniversityDTO;

    @ApiModelProperty({ type: ProductDTO, isArray: true, description: 'products relationship' })
    products: ProductDTO[];

    @ApiModelProperty({ type: ImageDTO, isArray: true, description: 'images relationship' })
    images: ImageDTO[];

    @ApiModelProperty({ type: CommentDTO, isArray: true, description: 'comments relationship' })
    comments: CommentDTO[];

    @ApiModelProperty({ type: AlbumDTO, isArray: true, description: 'albums relationship' })
    albums: AlbumDTO[];

    @ApiModelProperty({ type: FilesDTO, isArray: true, description: 'files relationship' })
    files: FilesDTO[];

    @ApiModelProperty({ type: DirectionDTO, isArray: true, description: 'directions relationship' })
    directions: DirectionDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

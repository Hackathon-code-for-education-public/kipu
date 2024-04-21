/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { University } from './university.entity';
import { Profile } from './profile.entity';
import { FileType } from './enumeration/file-type';
import {Files} from "./files.entity";

/**
 * A Files.
 */
@Entity('panorama_points')
export class PanoramaPoints extends BaseEntity {

    @Column()
    type: string

    @Column()
    yaw: number

    @Column()
    pitch: number

    @Column()
    text: string

    @Column()
    foreignProjectionIndex: number

    @ManyToOne(type => Files, (file) => file.points)
    file: Files;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

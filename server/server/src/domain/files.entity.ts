/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { University } from './university.entity';
import { Profile } from './profile.entity';
import { FileType } from './enumeration/file-type';

/**
 * A Files.
 */
@Entity('files')
export class Files extends BaseEntity {
    @Column({ name: 'url', nullable: true })
    url: string;

    @Column({ type: 'simple-enum', name: 'type', enum: FileType })
    type: FileType;

    @Column({ name: 'description', nullable: true })
    description: string;

    @ManyToOne(type => University)
    university: University;

    @ManyToOne(type => Profile)
    profile: Profile;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

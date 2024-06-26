/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { University } from './university.entity';

/**
 * A Album.
 */
@Entity('album')
export class Album extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @ManyToOne(type => University)
    university: University;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

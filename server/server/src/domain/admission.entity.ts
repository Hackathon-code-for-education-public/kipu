/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { University } from './university.entity';
import { Direction } from './direction.entity';
import { Profile } from './profile.entity';

/**
 * A Admission.
 */
@Entity('admission')
export class Admission extends BaseEntity {
    @OneToOne(type => University)
    @JoinColumn()
    university: University;

    @OneToOne(type => Direction)
    @JoinColumn()
    direction: Direction;

    @ManyToOne(type => Profile)
    profile: Profile;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

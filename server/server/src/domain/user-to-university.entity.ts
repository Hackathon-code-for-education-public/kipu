/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { University } from './university.entity';
import { ScienceDegree } from './enumeration/science-degree';

/**
 * A UserToUniversity.
 */
@Entity('user_to_university')
export class UserToUniversity extends BaseEntity {
    @Column({ type: 'simple-enum', name: 'science_degree', enum: ScienceDegree })
    scienceDegree: ScienceDegree;

    @OneToOne(type => University)
    universityId: University;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

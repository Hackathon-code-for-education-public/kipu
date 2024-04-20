/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { EntrySubject } from './entry-subject.entity';
import { University } from './university.entity';

/**
 * A Direction.
 */
@Entity('direction')
export class Direction extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @OneToMany((type) => EntrySubject, (other) => other.direction)
    disciplines: EntrySubject[];

    @ManyToOne((type) => University)
    university: University;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

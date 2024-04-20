/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Direction } from './direction.entity';

/**
 * A EntrySubject.
 */
@Entity('entry_subject')
export class EntrySubject extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ type: 'integer', name: 'minimum_score', nullable: true })
    minimumScore: number;

    @Column({ type: 'datetime', name: 'exam_date', nullable: true })
    examDate: any;

    @ManyToOne(type => Direction)
    direction: Direction;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

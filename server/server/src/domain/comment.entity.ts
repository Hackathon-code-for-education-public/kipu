/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Image } from './image.entity';
import { Profile } from './profile.entity';
import { University } from './university.entity';

/**
 * A Comment.
 */
@Entity('comment')
export class Comment extends BaseEntity {
    @Column({ name: 'content', nullable: true })
    content: string;

    @Column({ type: 'integer', name: 'rate', nullable: true })
    rate: number;

    @OneToMany((type) => Image, (other) => other.comment)
    images: Image[];

    @ManyToOne((type) => Profile)
    user: Profile;

    @ManyToOne((type) => University)
    university: University;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

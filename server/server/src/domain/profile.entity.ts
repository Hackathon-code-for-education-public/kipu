/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { UserToUniversity } from './user-to-university.entity';
import { Image } from './image.entity';
import { Admission } from './admission.entity';
import { Files } from './files.entity';

/**
 * A Profile.
 */
@Entity('profile')
export class Profile extends BaseEntity {
    @Column({ name: 'full_name', nullable: true })
    fullName: string;

    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string;

    @Column({ name: 'description', nullable: true })
    description: string;

    @Column({ type: 'integer', name: 'rating', nullable: true })
    rating: number;

    @OneToOne((type) => UserToUniversity)
    @JoinColumn()
    userId: UserToUniversity;

    @OneToOne((type) => Image)
    @JoinColumn()
    avatar: Image;

    @OneToMany((type) => Admission, (other) => other.profile)
    admissions: Admission[];

    @OneToMany((type) => Files, (other) => other.profile)
    files: Files[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

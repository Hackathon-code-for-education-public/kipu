/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { UserToUniversity } from './user-to-university.entity';
import { Product } from './product.entity';
import { Image } from './image.entity';
import { Comment } from './comment.entity';
import { Album } from './album.entity';
import { Files } from './files.entity';
import { Direction } from './direction.entity';

/**
 * A University.
 */
@Entity('university')
export class University extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ name: 'desciption', nullable: true })
    desciption: string;

    @Column({ name: 'address', nullable: true })
    address: string;

    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string;

    @Column({ name: 'email', nullable: true })
    email: string;

    @Column({ name: 'site', nullable: true })
    site: string;

    @Column({ name: 'phone_numbers', nullable: true })
    phoneNumbers: string;

    @Column({ name: 'emails', nullable: true })
    emails: string;

    @Column({ name: 'schedule', nullable: true })
    schedule: string;

    @Column({ name: 'responsible_person', nullable: true })
    responsiblePerson: string;

    @OneToOne((type) => UserToUniversity)
    @JoinColumn()
    id: UserToUniversity;

    @OneToMany((type) => Product, (other) => other.university)
    products: Product[];

    @OneToMany((type) => Image, (other) => other.university)
    images: Image[];

    @OneToMany((type) => Comment, (other) => other.university)
    comments: Comment[];

    @OneToMany((type) => Album, (other) => other.university)
    albums: Album[];

    @OneToMany((type) => Files, (other) => other.university)
    files: Files[];

    @OneToMany((type) => Direction, (other) => other.university)
    directions: Direction[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

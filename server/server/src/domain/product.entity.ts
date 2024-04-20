/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Image } from './image.entity';
import { University } from './university.entity';

/**
 * A Product.
 */
@Entity('product')
export class Product extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ type: 'integer', name: 'price', nullable: true })
    price: number;

    @Column({ name: 'description', nullable: true })
    description: string;

    @OneToMany((type) => Image, (other) => other.product)
    images: Image[];

    @ManyToOne((type) => University)
    university: University;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

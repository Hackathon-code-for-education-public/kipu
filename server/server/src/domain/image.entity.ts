/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Comment } from './comment.entity';
import { University } from './university.entity';
import { Product } from './product.entity';

/**
 * A Image.
 */
@Entity('image')
export class Image extends BaseEntity {
    @Column({ name: 'image_url', nullable: true })
    imageURL: string;

    @Column({ type: 'datetime', name: 'date', nullable: true })
    date: any;

    @ManyToOne((type) => Comment)
    comment: Comment;

    @ManyToOne((type) => University)
    university: University;

    @ManyToOne((type) => Product)
    product: Product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

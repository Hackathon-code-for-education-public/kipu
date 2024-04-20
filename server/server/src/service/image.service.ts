import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ImageDTO } from '../service/dto/image.dto';
import { ImageMapper } from '../service/mapper/image.mapper';
import { ImageRepository } from '../repository/image.repository';

const relationshipNames = [];
relationshipNames.push('comment');
relationshipNames.push('university');
relationshipNames.push('product');

@Injectable()
export class ImageService {
    logger = new Logger('ImageService');

    constructor(@InjectRepository(ImageRepository) private imageRepository: ImageRepository) {}

    async findById(id: number): Promise<ImageDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.imageRepository.findOne(id, options);
        return ImageMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<ImageDTO>): Promise<ImageDTO | undefined> {
        const result = await this.imageRepository.findOne(options);
        return ImageMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ImageDTO>): Promise<[ImageDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.imageRepository.findAndCount(options);
        const imageDTO: ImageDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((image) => imageDTO.push(ImageMapper.fromEntityToDTO(image)));
            resultList[0] = imageDTO;
        }
        return resultList;
    }

    async save(imageDTO: ImageDTO, creator?: string): Promise<ImageDTO | undefined> {
        const entity = ImageMapper.fromDTOtoEntity(imageDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.imageRepository.save(entity);
        return ImageMapper.fromEntityToDTO(result);
    }

    async update(imageDTO: ImageDTO, updater?: string): Promise<ImageDTO | undefined> {
        const entity = ImageMapper.fromDTOtoEntity(imageDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.imageRepository.save(entity);
        return ImageMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.imageRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

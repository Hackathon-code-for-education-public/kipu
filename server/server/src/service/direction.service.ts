import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { DirectionDTO } from '../service/dto/direction.dto';
import { DirectionMapper } from '../service/mapper/direction.mapper';
import { DirectionRepository } from '../repository/direction.repository';

const relationshipNames = [];
relationshipNames.push('university');

@Injectable()
export class DirectionService {
    logger = new Logger('DirectionService');

    constructor(@InjectRepository(DirectionRepository) private directionRepository: DirectionRepository) {}

    async findById(id: number): Promise<DirectionDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.directionRepository.findOne(id, options);
        return DirectionMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<DirectionDTO>): Promise<DirectionDTO | undefined> {
        const result = await this.directionRepository.findOne(options);
        return DirectionMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<DirectionDTO>): Promise<[DirectionDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.directionRepository.findAndCount(options);
        const directionDTO: DirectionDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(direction => directionDTO.push(DirectionMapper.fromEntityToDTO(direction)));
            resultList[0] = directionDTO;
        }
        return resultList;
    }

    async save(directionDTO: DirectionDTO, creator?: string): Promise<DirectionDTO | undefined> {
        const entity = DirectionMapper.fromDTOtoEntity(directionDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.directionRepository.save(entity);
        return DirectionMapper.fromEntityToDTO(result);
    }

    async update(directionDTO: DirectionDTO, updater?: string): Promise<DirectionDTO | undefined> {
        const entity = DirectionMapper.fromDTOtoEntity(directionDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.directionRepository.save(entity);
        return DirectionMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.directionRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

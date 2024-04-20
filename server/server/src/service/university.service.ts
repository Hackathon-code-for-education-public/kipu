import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { UniversityDTO } from '../service/dto/university.dto';
import { UniversityMapper } from '../service/mapper/university.mapper';
import { UniversityRepository } from '../repository/university.repository';

const relationshipNames = [];

@Injectable()
export class UniversityService {
    logger = new Logger('UniversityService');

    constructor(@InjectRepository(UniversityRepository) private universityRepository: UniversityRepository) {}

    async findById(id: number): Promise<UniversityDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.universityRepository.findOne(id, options);
        return UniversityMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<UniversityDTO>): Promise<UniversityDTO | undefined> {
        const result = await this.universityRepository.findOne(options);
        return UniversityMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<UniversityDTO>): Promise<[UniversityDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.universityRepository.findAndCount(options);
        const universityDTO: UniversityDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(university => universityDTO.push(UniversityMapper.fromEntityToDTO(university)));
            resultList[0] = universityDTO;
        }
        return resultList;
    }

    async save(universityDTO: UniversityDTO, creator?: string): Promise<UniversityDTO | undefined> {
        const entity = UniversityMapper.fromDTOtoEntity(universityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.universityRepository.save(entity);
        return UniversityMapper.fromEntityToDTO(result);
    }

    async update(universityDTO: UniversityDTO, updater?: string): Promise<UniversityDTO | undefined> {
        const entity = UniversityMapper.fromDTOtoEntity(universityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.universityRepository.save(entity);
        return UniversityMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.universityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

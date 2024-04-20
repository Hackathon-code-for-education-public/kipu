import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AdmissionDTO } from '../service/dto/admission.dto';
import { AdmissionMapper } from '../service/mapper/admission.mapper';
import { AdmissionRepository } from '../repository/admission.repository';

const relationshipNames = [];
relationshipNames.push('profile');

@Injectable()
export class AdmissionService {
    logger = new Logger('AdmissionService');

    constructor(@InjectRepository(AdmissionRepository) private admissionRepository: AdmissionRepository) {}

    async findById(id: number): Promise<AdmissionDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.admissionRepository.findOne(id, options);
        return AdmissionMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<AdmissionDTO>): Promise<AdmissionDTO | undefined> {
        const result = await this.admissionRepository.findOne(options);
        return AdmissionMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<AdmissionDTO>): Promise<[AdmissionDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.admissionRepository.findAndCount(options);
        const admissionDTO: AdmissionDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((admission) => admissionDTO.push(AdmissionMapper.fromEntityToDTO(admission)));
            resultList[0] = admissionDTO;
        }
        return resultList;
    }

    async save(admissionDTO: AdmissionDTO, creator?: string): Promise<AdmissionDTO | undefined> {
        const entity = AdmissionMapper.fromDTOtoEntity(admissionDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.admissionRepository.save(entity);
        return AdmissionMapper.fromEntityToDTO(result);
    }

    async update(admissionDTO: AdmissionDTO, updater?: string): Promise<AdmissionDTO | undefined> {
        const entity = AdmissionMapper.fromDTOtoEntity(admissionDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.admissionRepository.save(entity);
        return AdmissionMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.admissionRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

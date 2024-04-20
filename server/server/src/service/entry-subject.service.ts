import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { EntrySubjectDTO } from '../service/dto/entry-subject.dto';
import { EntrySubjectMapper } from '../service/mapper/entry-subject.mapper';
import { EntrySubjectRepository } from '../repository/entry-subject.repository';

const relationshipNames = [];
relationshipNames.push('direction');

@Injectable()
export class EntrySubjectService {
    logger = new Logger('EntrySubjectService');

    constructor(@InjectRepository(EntrySubjectRepository) private entrySubjectRepository: EntrySubjectRepository) {}

    async findById(id: number): Promise<EntrySubjectDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.entrySubjectRepository.findOne(id, options);
        return EntrySubjectMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<EntrySubjectDTO>): Promise<EntrySubjectDTO | undefined> {
        const result = await this.entrySubjectRepository.findOne(options);
        return EntrySubjectMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<EntrySubjectDTO>): Promise<[EntrySubjectDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.entrySubjectRepository.findAndCount(options);
        const entrySubjectDTO: EntrySubjectDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((entrySubject) =>
                entrySubjectDTO.push(EntrySubjectMapper.fromEntityToDTO(entrySubject)),
            );
            resultList[0] = entrySubjectDTO;
        }
        return resultList;
    }

    async save(entrySubjectDTO: EntrySubjectDTO, creator?: string): Promise<EntrySubjectDTO | undefined> {
        const entity = EntrySubjectMapper.fromDTOtoEntity(entrySubjectDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.entrySubjectRepository.save(entity);
        return EntrySubjectMapper.fromEntityToDTO(result);
    }

    async update(entrySubjectDTO: EntrySubjectDTO, updater?: string): Promise<EntrySubjectDTO | undefined> {
        const entity = EntrySubjectMapper.fromDTOtoEntity(entrySubjectDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.entrySubjectRepository.save(entity);
        return EntrySubjectMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.entrySubjectRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { UserToUniversityDTO } from '../service/dto/user-to-university.dto';
import { UserToUniversityMapper } from '../service/mapper/user-to-university.mapper';
import { UserToUniversityRepository } from '../repository/user-to-university.repository';

const relationshipNames = [];

@Injectable()
export class UserToUniversityService {
    logger = new Logger('UserToUniversityService');

    constructor(
        @InjectRepository(UserToUniversityRepository) private userToUniversityRepository: UserToUniversityRepository,
    ) {}

    async findById(id: number): Promise<UserToUniversityDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.userToUniversityRepository.findOne(id, options);
        return UserToUniversityMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<UserToUniversityDTO>): Promise<UserToUniversityDTO | undefined> {
        const result = await this.userToUniversityRepository.findOne(options);
        return UserToUniversityMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<UserToUniversityDTO>): Promise<[UserToUniversityDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.userToUniversityRepository.findAndCount(options);
        const userToUniversityDTO: UserToUniversityDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((userToUniversity) =>
                userToUniversityDTO.push(UserToUniversityMapper.fromEntityToDTO(userToUniversity)),
            );
            resultList[0] = userToUniversityDTO;
        }
        return resultList;
    }

    async save(userToUniversityDTO: UserToUniversityDTO, creator?: string): Promise<UserToUniversityDTO | undefined> {
        const entity = UserToUniversityMapper.fromDTOtoEntity(userToUniversityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.userToUniversityRepository.save(entity);
        return UserToUniversityMapper.fromEntityToDTO(result);
    }

    async update(userToUniversityDTO: UserToUniversityDTO, updater?: string): Promise<UserToUniversityDTO | undefined> {
        const entity = UserToUniversityMapper.fromDTOtoEntity(userToUniversityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.userToUniversityRepository.save(entity);
        return UserToUniversityMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.userToUniversityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

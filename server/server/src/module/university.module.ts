import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityController } from '../web/rest/university.controller';
import { UniversityRepository } from '../repository/university.repository';
import { UniversityService } from '../service/university.service';

@Module({
    imports: [TypeOrmModule.forFeature([UniversityRepository])],
    controllers: [UniversityController],
    providers: [UniversityService],
    exports: [UniversityService],
})
export class UniversityModule {}

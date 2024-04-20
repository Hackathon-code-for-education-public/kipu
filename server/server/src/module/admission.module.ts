import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmissionController } from '../web/rest/admission.controller';
import { AdmissionRepository } from '../repository/admission.repository';
import { AdmissionService } from '../service/admission.service';

@Module({
    imports: [TypeOrmModule.forFeature([AdmissionRepository])],
    controllers: [AdmissionController],
    providers: [AdmissionService],
    exports: [AdmissionService],
})
export class AdmissionModule {}

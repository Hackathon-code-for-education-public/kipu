import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntrySubjectController } from '../web/rest/entry-subject.controller';
import { EntrySubjectRepository } from '../repository/entry-subject.repository';
import { EntrySubjectService } from '../service/entry-subject.service';

@Module({
    imports: [TypeOrmModule.forFeature([EntrySubjectRepository])],
    controllers: [EntrySubjectController],
    providers: [EntrySubjectService],
    exports: [EntrySubjectService],
})
export class EntrySubjectModule {}

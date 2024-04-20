import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserToUniversityController } from '../web/rest/user-to-university.controller';
import { UserToUniversityRepository } from '../repository/user-to-university.repository';
import { UserToUniversityService } from '../service/user-to-university.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserToUniversityRepository])],
    controllers: [UserToUniversityController],
    providers: [UserToUniversityService],
    exports: [UserToUniversityService],
})
export class UserToUniversityModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectionController } from '../web/rest/direction.controller';
import { DirectionRepository } from '../repository/direction.repository';
import { DirectionService } from '../service/direction.service';

@Module({
    imports: [TypeOrmModule.forFeature([DirectionRepository])],
    controllers: [DirectionController],
    providers: [DirectionService],
    exports: [DirectionService],
})
export class DirectionModule {}

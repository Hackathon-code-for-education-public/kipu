import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from '../web/rest/image.controller';
import { ImageRepository } from '../repository/image.repository';
import { ImageService } from '../service/image.service';

@Module({
    imports: [TypeOrmModule.forFeature([ImageRepository])],
    controllers: [ImageController],
    providers: [ImageService],
    exports: [ImageService],
})
export class ImageModule {}

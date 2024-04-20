import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ImageDTO } from '../../service/dto/image.dto';
import { ImageService } from '../../service/image.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/images')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('images')
export class ImageController {
    logger = new Logger('ImageController');

    constructor(private readonly imageService: ImageService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ImageDTO,
    })
    async getAll(@Req() req: Request): Promise<ImageDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.imageService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: ImageDTO,
    })
    async getOne(@Param('id') id: number): Promise<ImageDTO> {
        return await this.imageService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create image' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ImageDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() imageDTO: ImageDTO): Promise<ImageDTO> {
        const created = await this.imageService.save(imageDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Image', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update image' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ImageDTO,
    })
    async put(@Req() req: Request, @Body() imageDTO: ImageDTO): Promise<ImageDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Image', imageDTO.id);
        return await this.imageService.update(imageDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update image with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ImageDTO,
    })
    async putId(@Req() req: Request, @Body() imageDTO: ImageDTO): Promise<ImageDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Image', imageDTO.id);
        return await this.imageService.update(imageDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete image' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Image', id);
        return await this.imageService.deleteById(id);
    }
}

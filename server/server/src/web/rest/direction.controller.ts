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
import { DirectionDTO } from '../../service/dto/direction.dto';
import { DirectionService } from '../../service/direction.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/directions')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('directions')
export class DirectionController {
    logger = new Logger('DirectionController');

    constructor(private readonly directionService: DirectionService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: DirectionDTO,
    })
    async getAll(@Req() req: Request): Promise<DirectionDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.directionService.findAndCount({
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
        type: DirectionDTO,
    })
    async getOne(@Param('id') id: number): Promise<DirectionDTO> {
        return await this.directionService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create direction' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: DirectionDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() directionDTO: DirectionDTO): Promise<DirectionDTO> {
        const created = await this.directionService.save(directionDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Direction', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update direction' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: DirectionDTO,
    })
    async put(@Req() req: Request, @Body() directionDTO: DirectionDTO): Promise<DirectionDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Direction', directionDTO.id);
        return await this.directionService.update(directionDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update direction with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: DirectionDTO,
    })
    async putId(@Req() req: Request, @Body() directionDTO: DirectionDTO): Promise<DirectionDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Direction', directionDTO.id);
        return await this.directionService.update(directionDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete direction' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Direction', id);
        return await this.directionService.deleteById(id);
    }
}

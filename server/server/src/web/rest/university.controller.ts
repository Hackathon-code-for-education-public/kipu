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
import { UniversityDTO } from '../../service/dto/university.dto';
import { UniversityService } from '../../service/university.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/universities')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('universities')
export class UniversityController {
    logger = new Logger('UniversityController');

    constructor(private readonly universityService: UniversityService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: UniversityDTO,
    })
    async getAll(@Req() req: Request): Promise<UniversityDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.universityService.findAndCount({
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
        type: UniversityDTO,
    })
    async getOne(@Param('id') id: number): Promise<UniversityDTO> {
        return await this.universityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create university' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: UniversityDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() universityDTO: UniversityDTO): Promise<UniversityDTO> {
        const created = await this.universityService.save(universityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'University', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update university' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: UniversityDTO,
    })
    async put(@Req() req: Request, @Body() universityDTO: UniversityDTO): Promise<UniversityDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'University', universityDTO.id);
        return await this.universityService.update(universityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update university with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: UniversityDTO,
    })
    async putId(@Req() req: Request, @Body() universityDTO: UniversityDTO): Promise<UniversityDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'University', universityDTO.id);
        return await this.universityService.update(universityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete university' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'University', id);
        return await this.universityService.deleteById(id);
    }
}

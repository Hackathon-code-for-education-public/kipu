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
import { EntrySubjectDTO } from '../../service/dto/entry-subject.dto';
import { EntrySubjectService } from '../../service/entry-subject.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/entry-subjects')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('entry-subjects')
export class EntrySubjectController {
    logger = new Logger('EntrySubjectController');

    constructor(private readonly entrySubjectService: EntrySubjectService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: EntrySubjectDTO,
    })
    async getAll(@Req() req: Request): Promise<EntrySubjectDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.entrySubjectService.findAndCount({
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
        type: EntrySubjectDTO,
    })
    async getOne(@Param('id') id: number): Promise<EntrySubjectDTO> {
        return await this.entrySubjectService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create entrySubject' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: EntrySubjectDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() entrySubjectDTO: EntrySubjectDTO): Promise<EntrySubjectDTO> {
        const created = await this.entrySubjectService.save(entrySubjectDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'EntrySubject', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update entrySubject' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: EntrySubjectDTO,
    })
    async put(@Req() req: Request, @Body() entrySubjectDTO: EntrySubjectDTO): Promise<EntrySubjectDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'EntrySubject', entrySubjectDTO.id);
        return await this.entrySubjectService.update(entrySubjectDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update entrySubject with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: EntrySubjectDTO,
    })
    async putId(@Req() req: Request, @Body() entrySubjectDTO: EntrySubjectDTO): Promise<EntrySubjectDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'EntrySubject', entrySubjectDTO.id);
        return await this.entrySubjectService.update(entrySubjectDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete entrySubject' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'EntrySubject', id);
        return await this.entrySubjectService.deleteById(id);
    }
}

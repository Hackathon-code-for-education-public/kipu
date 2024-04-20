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
import { AdmissionDTO } from '../../service/dto/admission.dto';
import { AdmissionService } from '../../service/admission.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/admissions')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('admissions')
export class AdmissionController {
    logger = new Logger('AdmissionController');

    constructor(private readonly admissionService: AdmissionService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: AdmissionDTO,
    })
    async getAll(@Req() req: Request): Promise<AdmissionDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.admissionService.findAndCount({
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
        type: AdmissionDTO,
    })
    async getOne(@Param('id') id: number): Promise<AdmissionDTO> {
        return await this.admissionService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create admission' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: AdmissionDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() admissionDTO: AdmissionDTO): Promise<AdmissionDTO> {
        const created = await this.admissionService.save(admissionDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Admission', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update admission' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AdmissionDTO,
    })
    async put(@Req() req: Request, @Body() admissionDTO: AdmissionDTO): Promise<AdmissionDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Admission', admissionDTO.id);
        return await this.admissionService.update(admissionDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update admission with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AdmissionDTO,
    })
    async putId(@Req() req: Request, @Body() admissionDTO: AdmissionDTO): Promise<AdmissionDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Admission', admissionDTO.id);
        return await this.admissionService.update(admissionDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete admission' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Admission', id);
        return await this.admissionService.deleteById(id);
    }
}

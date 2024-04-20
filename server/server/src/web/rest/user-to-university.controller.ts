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
import { UserToUniversityDTO } from '../../service/dto/user-to-university.dto';
import { UserToUniversityService } from '../../service/user-to-university.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/user-to-universities')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('user-to-universities')
export class UserToUniversityController {
    logger = new Logger('UserToUniversityController');

    constructor(private readonly userToUniversityService: UserToUniversityService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: UserToUniversityDTO,
    })
    async getAll(@Req() req: Request): Promise<UserToUniversityDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.userToUniversityService.findAndCount({
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
        type: UserToUniversityDTO,
    })
    async getOne(@Param('id') id: number): Promise<UserToUniversityDTO> {
        return await this.userToUniversityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create userToUniversity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: UserToUniversityDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() userToUniversityDTO: UserToUniversityDTO): Promise<UserToUniversityDTO> {
        const created = await this.userToUniversityService.save(userToUniversityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'UserToUniversity', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update userToUniversity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: UserToUniversityDTO,
    })
    async put(@Req() req: Request, @Body() userToUniversityDTO: UserToUniversityDTO): Promise<UserToUniversityDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'UserToUniversity', userToUniversityDTO.id);
        return await this.userToUniversityService.update(userToUniversityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update userToUniversity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: UserToUniversityDTO,
    })
    async putId(@Req() req: Request, @Body() userToUniversityDTO: UserToUniversityDTO): Promise<UserToUniversityDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'UserToUniversity', userToUniversityDTO.id);
        return await this.userToUniversityService.update(userToUniversityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete userToUniversity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'UserToUniversity', id);
        return await this.userToUniversityService.deleteById(id);
    }
}

import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { UserToUniversityDTO } from '../src/service/dto/user-to-university.dto';
import { UserToUniversityService } from '../src/service/user-to-university.service';

describe('UserToUniversity Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(UserToUniversityService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all user-to-universities ', async () => {
        const getEntities: UserToUniversityDTO[] = (
            await request(app.getHttpServer()).get('/api/user-to-universities').expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET user-to-universities by id', async () => {
        const getEntity: UserToUniversityDTO = (
            await request(app.getHttpServer())
                .get('/api/user-to-universities/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create user-to-universities', async () => {
        const createdEntity: UserToUniversityDTO = (
            await request(app.getHttpServer()).post('/api/user-to-universities').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update user-to-universities', async () => {
        const updatedEntity: UserToUniversityDTO = (
            await request(app.getHttpServer()).put('/api/user-to-universities').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update user-to-universities from id', async () => {
        const updatedEntity: UserToUniversityDTO = (
            await request(app.getHttpServer())
                .put('/api/user-to-universities/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE user-to-universities', async () => {
        const deletedEntity: UserToUniversityDTO = (
            await request(app.getHttpServer())
                .delete('/api/user-to-universities/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

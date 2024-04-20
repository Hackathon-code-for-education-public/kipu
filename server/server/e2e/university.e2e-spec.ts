import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { UniversityDTO } from '../src/service/dto/university.dto';
import { UniversityService } from '../src/service/university.service';

describe('University Controller', () => {
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
            .overrideProvider(UniversityService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all universities ', async () => {
        const getEntities: UniversityDTO[] = (await request(app.getHttpServer()).get('/api/universities').expect(200))
            .body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET universities by id', async () => {
        const getEntity: UniversityDTO = (
            await request(app.getHttpServer())
                .get('/api/universities/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create universities', async () => {
        const createdEntity: UniversityDTO = (
            await request(app.getHttpServer()).post('/api/universities').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update universities', async () => {
        const updatedEntity: UniversityDTO = (
            await request(app.getHttpServer()).put('/api/universities').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update universities from id', async () => {
        const updatedEntity: UniversityDTO = (
            await request(app.getHttpServer())
                .put('/api/universities/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE universities', async () => {
        const deletedEntity: UniversityDTO = (
            await request(app.getHttpServer())
                .delete('/api/universities/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

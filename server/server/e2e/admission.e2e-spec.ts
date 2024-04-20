import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { AdmissionDTO } from '../src/service/dto/admission.dto';
import { AdmissionService } from '../src/service/admission.service';

describe('Admission Controller', () => {
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
            .overrideProvider(AdmissionService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all admissions ', async () => {
        const getEntities: AdmissionDTO[] = (await request(app.getHttpServer()).get('/api/admissions').expect(200))
            .body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET admissions by id', async () => {
        const getEntity: AdmissionDTO = (
            await request(app.getHttpServer())
                .get('/api/admissions/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create admissions', async () => {
        const createdEntity: AdmissionDTO = (
            await request(app.getHttpServer()).post('/api/admissions').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update admissions', async () => {
        const updatedEntity: AdmissionDTO = (
            await request(app.getHttpServer()).put('/api/admissions').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update admissions from id', async () => {
        const updatedEntity: AdmissionDTO = (
            await request(app.getHttpServer())
                .put('/api/admissions/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE admissions', async () => {
        const deletedEntity: AdmissionDTO = (
            await request(app.getHttpServer())
                .delete('/api/admissions/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

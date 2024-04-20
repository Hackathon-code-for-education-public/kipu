import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { EntrySubjectDTO } from '../src/service/dto/entry-subject.dto';
import { EntrySubjectService } from '../src/service/entry-subject.service';

describe('EntrySubject Controller', () => {
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
            .overrideProvider(EntrySubjectService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all entry-subjects ', async () => {
        const getEntities: EntrySubjectDTO[] = (
            await request(app.getHttpServer()).get('/api/entry-subjects').expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET entry-subjects by id', async () => {
        const getEntity: EntrySubjectDTO = (
            await request(app.getHttpServer())
                .get('/api/entry-subjects/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create entry-subjects', async () => {
        const createdEntity: EntrySubjectDTO = (
            await request(app.getHttpServer()).post('/api/entry-subjects').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update entry-subjects', async () => {
        const updatedEntity: EntrySubjectDTO = (
            await request(app.getHttpServer()).put('/api/entry-subjects').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update entry-subjects from id', async () => {
        const updatedEntity: EntrySubjectDTO = (
            await request(app.getHttpServer())
                .put('/api/entry-subjects/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE entry-subjects', async () => {
        const deletedEntity: EntrySubjectDTO = (
            await request(app.getHttpServer())
                .delete('/api/entry-subjects/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

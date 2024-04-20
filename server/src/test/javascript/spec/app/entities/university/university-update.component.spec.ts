/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import UniversityUpdateComponent from '@/entities/university/university-update.vue';
import UniversityClass from '@/entities/university/university-update.component';
import UniversityService from '@/entities/university/university.service';

import UserToUniversityService from '@/entities/user-to-university/user-to-university.service';

import ProductService from '@/entities/product/product.service';

import ImageService from '@/entities/image/image.service';

import CommentService from '@/entities/comment/comment.service';

import AlbumService from '@/entities/album/album.service';

import FilesService from '@/entities/files/files.service';

import DirectionService from '@/entities/direction/direction.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('University Management Update Component', () => {
    let wrapper: Wrapper<UniversityClass>;
    let comp: UniversityClass;
    let universityServiceStub: SinonStubbedInstance<UniversityService>;

    beforeEach(() => {
      universityServiceStub = sinon.createStubInstance<UniversityService>(UniversityService);

      wrapper = shallowMount<UniversityClass>(UniversityUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          universityService: () => universityServiceStub,

          userToUniversityService: () => new UserToUniversityService(),

          productService: () => new ProductService(),

          imageService: () => new ImageService(),

          commentService: () => new CommentService(),

          albumService: () => new AlbumService(),

          filesService: () => new FilesService(),

          directionService: () => new DirectionService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.university = entity;
        universityServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(universityServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.university = entity;
        universityServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(universityServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundUniversity = { id: 123 };
        universityServiceStub.find.resolves(foundUniversity);
        universityServiceStub.retrieve.resolves([foundUniversity]);

        // WHEN
        comp.beforeRouteEnter({ params: { universityId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.university).toBe(foundUniversity);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});

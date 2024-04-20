/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import DirectionUpdateComponent from '@/entities/direction/direction-update.vue';
import DirectionClass from '@/entities/direction/direction-update.component';
import DirectionService from '@/entities/direction/direction.service';

import EntrySubjectService from '@/entities/entry-subject/entry-subject.service';

import UniversityService from '@/entities/university/university.service';

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
  describe('Direction Management Update Component', () => {
    let wrapper: Wrapper<DirectionClass>;
    let comp: DirectionClass;
    let directionServiceStub: SinonStubbedInstance<DirectionService>;

    beforeEach(() => {
      directionServiceStub = sinon.createStubInstance<DirectionService>(DirectionService);

      wrapper = shallowMount<DirectionClass>(DirectionUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          directionService: () => directionServiceStub,

          entrySubjectService: () => new EntrySubjectService(),

          universityService: () => new UniversityService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.direction = entity;
        directionServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(directionServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.direction = entity;
        directionServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(directionServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundDirection = { id: 123 };
        directionServiceStub.find.resolves(foundDirection);
        directionServiceStub.retrieve.resolves([foundDirection]);

        // WHEN
        comp.beforeRouteEnter({ params: { directionId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.direction).toBe(foundDirection);
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

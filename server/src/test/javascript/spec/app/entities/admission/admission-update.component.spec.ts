/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import AdmissionUpdateComponent from '@/entities/admission/admission-update.vue';
import AdmissionClass from '@/entities/admission/admission-update.component';
import AdmissionService from '@/entities/admission/admission.service';

import UniversityService from '@/entities/university/university.service';

import DirectionService from '@/entities/direction/direction.service';

import ProfileService from '@/entities/profile/profile.service';

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
  describe('Admission Management Update Component', () => {
    let wrapper: Wrapper<AdmissionClass>;
    let comp: AdmissionClass;
    let admissionServiceStub: SinonStubbedInstance<AdmissionService>;

    beforeEach(() => {
      admissionServiceStub = sinon.createStubInstance<AdmissionService>(AdmissionService);

      wrapper = shallowMount<AdmissionClass>(AdmissionUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          admissionService: () => admissionServiceStub,

          universityService: () => new UniversityService(),

          directionService: () => new DirectionService(),

          profileService: () => new ProfileService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.admission = entity;
        admissionServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(admissionServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.admission = entity;
        admissionServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(admissionServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundAdmission = { id: 123 };
        admissionServiceStub.find.resolves(foundAdmission);
        admissionServiceStub.retrieve.resolves([foundAdmission]);

        // WHEN
        comp.beforeRouteEnter({ params: { admissionId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.admission).toBe(foundAdmission);
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

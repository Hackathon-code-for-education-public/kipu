/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import AdmissionDetailComponent from '@/entities/admission/admission-details.vue';
import AdmissionClass from '@/entities/admission/admission-details.component';
import AdmissionService from '@/entities/admission/admission.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Admission Management Detail Component', () => {
    let wrapper: Wrapper<AdmissionClass>;
    let comp: AdmissionClass;
    let admissionServiceStub: SinonStubbedInstance<AdmissionService>;

    beforeEach(() => {
      admissionServiceStub = sinon.createStubInstance<AdmissionService>(AdmissionService);

      wrapper = shallowMount<AdmissionClass>(AdmissionDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { admissionService: () => admissionServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundAdmission = { id: 123 };
        admissionServiceStub.find.resolves(foundAdmission);

        // WHEN
        comp.retrieveAdmission(123);
        await comp.$nextTick();

        // THEN
        expect(comp.admission).toBe(foundAdmission);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundAdmission = { id: 123 };
        admissionServiceStub.find.resolves(foundAdmission);

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

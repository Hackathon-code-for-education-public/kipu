/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import AdmissionComponent from '@/entities/admission/admission.vue';
import AdmissionClass from '@/entities/admission/admission.component';
import AdmissionService from '@/entities/admission/admission.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Admission Management Component', () => {
    let wrapper: Wrapper<AdmissionClass>;
    let comp: AdmissionClass;
    let admissionServiceStub: SinonStubbedInstance<AdmissionService>;

    beforeEach(() => {
      admissionServiceStub = sinon.createStubInstance<AdmissionService>(AdmissionService);
      admissionServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<AdmissionClass>(AdmissionComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          admissionService: () => admissionServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      admissionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllAdmissions();
      await comp.$nextTick();

      // THEN
      expect(admissionServiceStub.retrieve.called).toBeTruthy();
      expect(comp.admissions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      admissionServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeAdmission();
      await comp.$nextTick();

      // THEN
      expect(admissionServiceStub.delete.called).toBeTruthy();
      expect(admissionServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});

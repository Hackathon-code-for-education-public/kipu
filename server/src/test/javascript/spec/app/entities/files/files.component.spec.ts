/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import FilesComponent from '@/entities/files/files.vue';
import FilesClass from '@/entities/files/files.component';
import FilesService from '@/entities/files/files.service';

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
  describe('Files Management Component', () => {
    let wrapper: Wrapper<FilesClass>;
    let comp: FilesClass;
    let filesServiceStub: SinonStubbedInstance<FilesService>;

    beforeEach(() => {
      filesServiceStub = sinon.createStubInstance<FilesService>(FilesService);
      filesServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<FilesClass>(FilesComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          filesService: () => filesServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      filesServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllFiless();
      await comp.$nextTick();

      // THEN
      expect(filesServiceStub.retrieve.called).toBeTruthy();
      expect(comp.files[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      filesServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeFiles();
      await comp.$nextTick();

      // THEN
      expect(filesServiceStub.delete.called).toBeTruthy();
      expect(filesServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});

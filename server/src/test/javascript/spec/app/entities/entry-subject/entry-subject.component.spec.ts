/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import EntrySubjectComponent from '@/entities/entry-subject/entry-subject.vue';
import EntrySubjectClass from '@/entities/entry-subject/entry-subject.component';
import EntrySubjectService from '@/entities/entry-subject/entry-subject.service';

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
  describe('EntrySubject Management Component', () => {
    let wrapper: Wrapper<EntrySubjectClass>;
    let comp: EntrySubjectClass;
    let entrySubjectServiceStub: SinonStubbedInstance<EntrySubjectService>;

    beforeEach(() => {
      entrySubjectServiceStub = sinon.createStubInstance<EntrySubjectService>(EntrySubjectService);
      entrySubjectServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<EntrySubjectClass>(EntrySubjectComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          entrySubjectService: () => entrySubjectServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      entrySubjectServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllEntrySubjects();
      await comp.$nextTick();

      // THEN
      expect(entrySubjectServiceStub.retrieve.called).toBeTruthy();
      expect(comp.entrySubjects[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      entrySubjectServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeEntrySubject();
      await comp.$nextTick();

      // THEN
      expect(entrySubjectServiceStub.delete.called).toBeTruthy();
      expect(entrySubjectServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});

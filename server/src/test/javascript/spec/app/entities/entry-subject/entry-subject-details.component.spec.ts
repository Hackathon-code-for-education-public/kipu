/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import EntrySubjectDetailComponent from '@/entities/entry-subject/entry-subject-details.vue';
import EntrySubjectClass from '@/entities/entry-subject/entry-subject-details.component';
import EntrySubjectService from '@/entities/entry-subject/entry-subject.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('EntrySubject Management Detail Component', () => {
    let wrapper: Wrapper<EntrySubjectClass>;
    let comp: EntrySubjectClass;
    let entrySubjectServiceStub: SinonStubbedInstance<EntrySubjectService>;

    beforeEach(() => {
      entrySubjectServiceStub = sinon.createStubInstance<EntrySubjectService>(EntrySubjectService);

      wrapper = shallowMount<EntrySubjectClass>(EntrySubjectDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { entrySubjectService: () => entrySubjectServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundEntrySubject = { id: 123 };
        entrySubjectServiceStub.find.resolves(foundEntrySubject);

        // WHEN
        comp.retrieveEntrySubject(123);
        await comp.$nextTick();

        // THEN
        expect(comp.entrySubject).toBe(foundEntrySubject);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundEntrySubject = { id: 123 };
        entrySubjectServiceStub.find.resolves(foundEntrySubject);

        // WHEN
        comp.beforeRouteEnter({ params: { entrySubjectId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.entrySubject).toBe(foundEntrySubject);
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

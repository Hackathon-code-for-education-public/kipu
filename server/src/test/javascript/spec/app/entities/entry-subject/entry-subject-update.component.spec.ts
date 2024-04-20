/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import * as config from '@/shared/config/config';
import EntrySubjectUpdateComponent from '@/entities/entry-subject/entry-subject-update.vue';
import EntrySubjectClass from '@/entities/entry-subject/entry-subject-update.component';
import EntrySubjectService from '@/entities/entry-subject/entry-subject.service';

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
  describe('EntrySubject Management Update Component', () => {
    let wrapper: Wrapper<EntrySubjectClass>;
    let comp: EntrySubjectClass;
    let entrySubjectServiceStub: SinonStubbedInstance<EntrySubjectService>;

    beforeEach(() => {
      entrySubjectServiceStub = sinon.createStubInstance<EntrySubjectService>(EntrySubjectService);

      wrapper = shallowMount<EntrySubjectClass>(EntrySubjectUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          entrySubjectService: () => entrySubjectServiceStub,

          directionService: () => new DirectionService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('load', () => {
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.entrySubject = entity;
        entrySubjectServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(entrySubjectServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.entrySubject = entity;
        entrySubjectServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(entrySubjectServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundEntrySubject = { id: 123 };
        entrySubjectServiceStub.find.resolves(foundEntrySubject);
        entrySubjectServiceStub.retrieve.resolves([foundEntrySubject]);

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

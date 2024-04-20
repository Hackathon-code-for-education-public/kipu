/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import UniversityDetailComponent from '@/entities/university/university-details.vue';
import UniversityClass from '@/entities/university/university-details.component';
import UniversityService from '@/entities/university/university.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('University Management Detail Component', () => {
    let wrapper: Wrapper<UniversityClass>;
    let comp: UniversityClass;
    let universityServiceStub: SinonStubbedInstance<UniversityService>;

    beforeEach(() => {
      universityServiceStub = sinon.createStubInstance<UniversityService>(UniversityService);

      wrapper = shallowMount<UniversityClass>(UniversityDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { universityService: () => universityServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundUniversity = { id: 123 };
        universityServiceStub.find.resolves(foundUniversity);

        // WHEN
        comp.retrieveUniversity(123);
        await comp.$nextTick();

        // THEN
        expect(comp.university).toBe(foundUniversity);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundUniversity = { id: 123 };
        universityServiceStub.find.resolves(foundUniversity);

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

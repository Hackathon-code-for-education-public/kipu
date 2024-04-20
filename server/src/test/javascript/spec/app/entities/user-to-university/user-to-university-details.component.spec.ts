/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import UserToUniversityDetailComponent from '@/entities/user-to-university/user-to-university-details.vue';
import UserToUniversityClass from '@/entities/user-to-university/user-to-university-details.component';
import UserToUniversityService from '@/entities/user-to-university/user-to-university.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('UserToUniversity Management Detail Component', () => {
    let wrapper: Wrapper<UserToUniversityClass>;
    let comp: UserToUniversityClass;
    let userToUniversityServiceStub: SinonStubbedInstance<UserToUniversityService>;

    beforeEach(() => {
      userToUniversityServiceStub = sinon.createStubInstance<UserToUniversityService>(UserToUniversityService);

      wrapper = shallowMount<UserToUniversityClass>(UserToUniversityDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { userToUniversityService: () => userToUniversityServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundUserToUniversity = { id: 123 };
        userToUniversityServiceStub.find.resolves(foundUserToUniversity);

        // WHEN
        comp.retrieveUserToUniversity(123);
        await comp.$nextTick();

        // THEN
        expect(comp.userToUniversity).toBe(foundUserToUniversity);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundUserToUniversity = { id: 123 };
        userToUniversityServiceStub.find.resolves(foundUserToUniversity);

        // WHEN
        comp.beforeRouteEnter({ params: { userToUniversityId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.userToUniversity).toBe(foundUserToUniversity);
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

/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProfileDetailComponent from '@/entities/profile/profile-details.vue';
import ProfileClass from '@/entities/profile/profile-details.component';
import ProfileService from '@/entities/profile/profile.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Profile Management Detail Component', () => {
    let wrapper: Wrapper<ProfileClass>;
    let comp: ProfileClass;
    let profileServiceStub: SinonStubbedInstance<ProfileService>;

    beforeEach(() => {
      profileServiceStub = sinon.createStubInstance<ProfileService>(ProfileService);

      wrapper = shallowMount<ProfileClass>(ProfileDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { profileService: () => profileServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProfile = { id: 123 };
        profileServiceStub.find.resolves(foundProfile);

        // WHEN
        comp.retrieveProfile(123);
        await comp.$nextTick();

        // THEN
        expect(comp.profile).toBe(foundProfile);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProfile = { id: 123 };
        profileServiceStub.find.resolves(foundProfile);

        // WHEN
        comp.beforeRouteEnter({ params: { profileId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.profile).toBe(foundProfile);
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

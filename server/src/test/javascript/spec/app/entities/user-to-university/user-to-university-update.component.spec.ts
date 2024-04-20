/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import UserToUniversityUpdateComponent from '@/entities/user-to-university/user-to-university-update.vue';
import UserToUniversityClass from '@/entities/user-to-university/user-to-university-update.component';
import UserToUniversityService from '@/entities/user-to-university/user-to-university.service';

import UniversityService from '@/entities/university/university.service';

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
  describe('UserToUniversity Management Update Component', () => {
    let wrapper: Wrapper<UserToUniversityClass>;
    let comp: UserToUniversityClass;
    let userToUniversityServiceStub: SinonStubbedInstance<UserToUniversityService>;

    beforeEach(() => {
      userToUniversityServiceStub = sinon.createStubInstance<UserToUniversityService>(UserToUniversityService);

      wrapper = shallowMount<UserToUniversityClass>(UserToUniversityUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          userToUniversityService: () => userToUniversityServiceStub,

          universityService: () => new UniversityService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.userToUniversity = entity;
        userToUniversityServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(userToUniversityServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.userToUniversity = entity;
        userToUniversityServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(userToUniversityServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundUserToUniversity = { id: 123 };
        userToUniversityServiceStub.find.resolves(foundUserToUniversity);
        userToUniversityServiceStub.retrieve.resolves([foundUserToUniversity]);

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

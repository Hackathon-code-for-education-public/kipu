/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ProfileUpdateComponent from '@/entities/profile/profile-update.vue';
import ProfileClass from '@/entities/profile/profile-update.component';
import ProfileService from '@/entities/profile/profile.service';

import UserToUniversityService from '@/entities/user-to-university/user-to-university.service';

import ImageService from '@/entities/image/image.service';

import AdmissionService from '@/entities/admission/admission.service';

import FilesService from '@/entities/files/files.service';

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
  describe('Profile Management Update Component', () => {
    let wrapper: Wrapper<ProfileClass>;
    let comp: ProfileClass;
    let profileServiceStub: SinonStubbedInstance<ProfileService>;

    beforeEach(() => {
      profileServiceStub = sinon.createStubInstance<ProfileService>(ProfileService);

      wrapper = shallowMount<ProfileClass>(ProfileUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          profileService: () => profileServiceStub,

          userToUniversityService: () => new UserToUniversityService(),

          imageService: () => new ImageService(),

          admissionService: () => new AdmissionService(),

          filesService: () => new FilesService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.profile = entity;
        profileServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(profileServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.profile = entity;
        profileServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(profileServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProfile = { id: 123 };
        profileServiceStub.find.resolves(foundProfile);
        profileServiceStub.retrieve.resolves([foundProfile]);

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

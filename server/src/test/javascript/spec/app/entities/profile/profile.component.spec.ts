/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ProfileComponent from '@/entities/profile/profile.vue';
import ProfileClass from '@/entities/profile/profile.component';
import ProfileService from '@/entities/profile/profile.service';

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
  describe('Profile Management Component', () => {
    let wrapper: Wrapper<ProfileClass>;
    let comp: ProfileClass;
    let profileServiceStub: SinonStubbedInstance<ProfileService>;

    beforeEach(() => {
      profileServiceStub = sinon.createStubInstance<ProfileService>(ProfileService);
      profileServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProfileClass>(ProfileComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          profileService: () => profileServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      profileServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllProfiles();
      await comp.$nextTick();

      // THEN
      expect(profileServiceStub.retrieve.called).toBeTruthy();
      expect(comp.profiles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      profileServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeProfile();
      await comp.$nextTick();

      // THEN
      expect(profileServiceStub.delete.called).toBeTruthy();
      expect(profileServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});

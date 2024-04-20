/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import UserToUniversityComponent from '@/entities/user-to-university/user-to-university.vue';
import UserToUniversityClass from '@/entities/user-to-university/user-to-university.component';
import UserToUniversityService from '@/entities/user-to-university/user-to-university.service';

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
  describe('UserToUniversity Management Component', () => {
    let wrapper: Wrapper<UserToUniversityClass>;
    let comp: UserToUniversityClass;
    let userToUniversityServiceStub: SinonStubbedInstance<UserToUniversityService>;

    beforeEach(() => {
      userToUniversityServiceStub = sinon.createStubInstance<UserToUniversityService>(UserToUniversityService);
      userToUniversityServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<UserToUniversityClass>(UserToUniversityComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          userToUniversityService: () => userToUniversityServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      userToUniversityServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllUserToUniversitys();
      await comp.$nextTick();

      // THEN
      expect(userToUniversityServiceStub.retrieve.called).toBeTruthy();
      expect(comp.userToUniversities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      userToUniversityServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeUserToUniversity();
      await comp.$nextTick();

      // THEN
      expect(userToUniversityServiceStub.delete.called).toBeTruthy();
      expect(userToUniversityServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});

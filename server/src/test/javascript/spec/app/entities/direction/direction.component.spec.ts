/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import DirectionComponent from '@/entities/direction/direction.vue';
import DirectionClass from '@/entities/direction/direction.component';
import DirectionService from '@/entities/direction/direction.service';

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
  describe('Direction Management Component', () => {
    let wrapper: Wrapper<DirectionClass>;
    let comp: DirectionClass;
    let directionServiceStub: SinonStubbedInstance<DirectionService>;

    beforeEach(() => {
      directionServiceStub = sinon.createStubInstance<DirectionService>(DirectionService);
      directionServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<DirectionClass>(DirectionComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          directionService: () => directionServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      directionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllDirections();
      await comp.$nextTick();

      // THEN
      expect(directionServiceStub.retrieve.called).toBeTruthy();
      expect(comp.directions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      directionServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeDirection();
      await comp.$nextTick();

      // THEN
      expect(directionServiceStub.delete.called).toBeTruthy();
      expect(directionServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});

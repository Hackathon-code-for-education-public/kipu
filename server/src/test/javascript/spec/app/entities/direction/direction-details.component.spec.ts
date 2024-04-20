/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import DirectionDetailComponent from '@/entities/direction/direction-details.vue';
import DirectionClass from '@/entities/direction/direction-details.component';
import DirectionService from '@/entities/direction/direction.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Direction Management Detail Component', () => {
    let wrapper: Wrapper<DirectionClass>;
    let comp: DirectionClass;
    let directionServiceStub: SinonStubbedInstance<DirectionService>;

    beforeEach(() => {
      directionServiceStub = sinon.createStubInstance<DirectionService>(DirectionService);

      wrapper = shallowMount<DirectionClass>(DirectionDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { directionService: () => directionServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundDirection = { id: 123 };
        directionServiceStub.find.resolves(foundDirection);

        // WHEN
        comp.retrieveDirection(123);
        await comp.$nextTick();

        // THEN
        expect(comp.direction).toBe(foundDirection);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundDirection = { id: 123 };
        directionServiceStub.find.resolves(foundDirection);

        // WHEN
        comp.beforeRouteEnter({ params: { directionId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.direction).toBe(foundDirection);
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

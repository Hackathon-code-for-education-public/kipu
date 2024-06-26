/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import CommentComponent from '@/entities/comment/comment.vue';
import CommentClass from '@/entities/comment/comment.component';
import CommentService from '@/entities/comment/comment.service';

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
  describe('Comment Management Component', () => {
    let wrapper: Wrapper<CommentClass>;
    let comp: CommentClass;
    let commentServiceStub: SinonStubbedInstance<CommentService>;

    beforeEach(() => {
      commentServiceStub = sinon.createStubInstance<CommentService>(CommentService);
      commentServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CommentClass>(CommentComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          commentService: () => commentServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      commentServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllComments();
      await comp.$nextTick();

      // THEN
      expect(commentServiceStub.retrieve.called).toBeTruthy();
      expect(comp.comments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      commentServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeComment();
      await comp.$nextTick();

      // THEN
      expect(commentServiceStub.delete.called).toBeTruthy();
      expect(commentServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});

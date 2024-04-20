/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import CommentUpdateComponent from '@/entities/comment/comment-update.vue';
import CommentClass from '@/entities/comment/comment-update.component';
import CommentService from '@/entities/comment/comment.service';

import ImageService from '@/entities/image/image.service';

import ProfileService from '@/entities/profile/profile.service';

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
  describe('Comment Management Update Component', () => {
    let wrapper: Wrapper<CommentClass>;
    let comp: CommentClass;
    let commentServiceStub: SinonStubbedInstance<CommentService>;

    beforeEach(() => {
      commentServiceStub = sinon.createStubInstance<CommentService>(CommentService);

      wrapper = shallowMount<CommentClass>(CommentUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          commentService: () => commentServiceStub,

          imageService: () => new ImageService(),

          profileService: () => new ProfileService(),

          universityService: () => new UniversityService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.comment = entity;
        commentServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(commentServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.comment = entity;
        commentServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(commentServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundComment = { id: 123 };
        commentServiceStub.find.resolves(foundComment);
        commentServiceStub.retrieve.resolves([foundComment]);

        // WHEN
        comp.beforeRouteEnter({ params: { commentId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.comment).toBe(foundComment);
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
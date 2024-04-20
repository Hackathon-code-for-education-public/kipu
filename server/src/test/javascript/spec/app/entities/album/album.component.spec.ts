/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import AlbumComponent from '@/entities/album/album.vue';
import AlbumClass from '@/entities/album/album.component';
import AlbumService from '@/entities/album/album.service';

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
  describe('Album Management Component', () => {
    let wrapper: Wrapper<AlbumClass>;
    let comp: AlbumClass;
    let albumServiceStub: SinonStubbedInstance<AlbumService>;

    beforeEach(() => {
      albumServiceStub = sinon.createStubInstance<AlbumService>(AlbumService);
      albumServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<AlbumClass>(AlbumComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          albumService: () => albumServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      albumServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllAlbums();
      await comp.$nextTick();

      // THEN
      expect(albumServiceStub.retrieve.called).toBeTruthy();
      expect(comp.albums[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      albumServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeAlbum();
      await comp.$nextTick();

      // THEN
      expect(albumServiceStub.delete.called).toBeTruthy();
      expect(albumServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});

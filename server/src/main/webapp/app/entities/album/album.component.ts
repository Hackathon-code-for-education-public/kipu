import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IAlbum } from '@/shared/model/album.model';

import AlbumService from './album.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Album extends Vue {
  @Inject('albumService') private albumService: () => AlbumService;
  private removeId: number = null;

  public albums: IAlbum[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllAlbums();
  }

  public clear(): void {
    this.retrieveAllAlbums();
  }

  public retrieveAllAlbums(): void {
    this.isFetching = true;

    this.albumService()
      .retrieve()
      .then(
        res => {
          this.albums = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IAlbum): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeAlbum(): void {
    this.albumService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('hackatonappApp.album.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllAlbums();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

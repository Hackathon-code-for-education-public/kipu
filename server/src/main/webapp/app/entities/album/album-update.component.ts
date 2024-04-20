import { Component, Vue, Inject } from 'vue-property-decorator';

import UniversityService from '@/entities/university/university.service';
import { IUniversity } from '@/shared/model/university.model';

import { IAlbum, Album } from '@/shared/model/album.model';
import AlbumService from './album.service';

const validations: any = {
  album: {
    name: {},
  },
};

@Component({
  validations,
})
export default class AlbumUpdate extends Vue {
  @Inject('albumService') private albumService: () => AlbumService;
  public album: IAlbum = new Album();

  @Inject('universityService') private universityService: () => UniversityService;

  public universities: IUniversity[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.albumId) {
        vm.retrieveAlbum(to.params.albumId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.album.id) {
      this.albumService()
        .update(this.album)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.album.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.albumService()
        .create(this.album)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.album.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    }
  }

  public retrieveAlbum(albumId): void {
    this.albumService()
      .find(albumId)
      .then(res => {
        this.album = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.universityService()
      .retrieve()
      .then(res => {
        this.universities = res.data;
      });
  }
}

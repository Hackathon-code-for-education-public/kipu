import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IFiles } from '@/shared/model/files.model';

import FilesService from './files.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Files extends Vue {
  @Inject('filesService') private filesService: () => FilesService;
  private removeId: number = null;

  public files: IFiles[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllFiless();
  }

  public clear(): void {
    this.retrieveAllFiless();
  }

  public retrieveAllFiless(): void {
    this.isFetching = true;

    this.filesService()
      .retrieve()
      .then(
        res => {
          this.files = res.data;
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

  public prepareRemove(instance: IFiles): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeFiles(): void {
    this.filesService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('hackatonappApp.files.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllFiless();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

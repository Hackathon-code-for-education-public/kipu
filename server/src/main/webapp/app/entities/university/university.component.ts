import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IUniversity } from '@/shared/model/university.model';

import UniversityService from './university.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class University extends Vue {
  @Inject('universityService') private universityService: () => UniversityService;
  private removeId: number = null;

  public universities: IUniversity[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllUniversitys();
  }

  public clear(): void {
    this.retrieveAllUniversitys();
  }

  public retrieveAllUniversitys(): void {
    this.isFetching = true;

    this.universityService()
      .retrieve()
      .then(
        res => {
          this.universities = res.data;
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

  public prepareRemove(instance: IUniversity): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeUniversity(): void {
    this.universityService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('hackatonappApp.university.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllUniversitys();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

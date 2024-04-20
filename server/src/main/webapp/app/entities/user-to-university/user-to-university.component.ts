import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IUserToUniversity } from '@/shared/model/user-to-university.model';

import UserToUniversityService from './user-to-university.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class UserToUniversity extends Vue {
  @Inject('userToUniversityService') private userToUniversityService: () => UserToUniversityService;
  private removeId: number = null;

  public userToUniversities: IUserToUniversity[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllUserToUniversitys();
  }

  public clear(): void {
    this.retrieveAllUserToUniversitys();
  }

  public retrieveAllUserToUniversitys(): void {
    this.isFetching = true;

    this.userToUniversityService()
      .retrieve()
      .then(
        res => {
          this.userToUniversities = res.data;
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

  public prepareRemove(instance: IUserToUniversity): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeUserToUniversity(): void {
    this.userToUniversityService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('hackatonappApp.userToUniversity.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllUserToUniversitys();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

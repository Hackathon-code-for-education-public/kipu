import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IProfile } from '@/shared/model/profile.model';

import ProfileService from './profile.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Profile extends Vue {
  @Inject('profileService') private profileService: () => ProfileService;
  private removeId: number = null;

  public profiles: IProfile[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllProfiles();
  }

  public clear(): void {
    this.retrieveAllProfiles();
  }

  public retrieveAllProfiles(): void {
    this.isFetching = true;

    this.profileService()
      .retrieve()
      .then(
        res => {
          this.profiles = res.data;
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

  public prepareRemove(instance: IProfile): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeProfile(): void {
    this.profileService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('hackatonappApp.profile.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllProfiles();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

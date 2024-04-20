import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProfile } from '@/shared/model/profile.model';
import ProfileService from './profile.service';

@Component
export default class ProfileDetails extends Vue {
  @Inject('profileService') private profileService: () => ProfileService;
  public profile: IProfile = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.profileId) {
        vm.retrieveProfile(to.params.profileId);
      }
    });
  }

  public retrieveProfile(profileId) {
    this.profileService()
      .find(profileId)
      .then(res => {
        this.profile = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

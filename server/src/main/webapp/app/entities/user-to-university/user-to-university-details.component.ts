import { Component, Vue, Inject } from 'vue-property-decorator';

import { IUserToUniversity } from '@/shared/model/user-to-university.model';
import UserToUniversityService from './user-to-university.service';

@Component
export default class UserToUniversityDetails extends Vue {
  @Inject('userToUniversityService') private userToUniversityService: () => UserToUniversityService;
  public userToUniversity: IUserToUniversity = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.userToUniversityId) {
        vm.retrieveUserToUniversity(to.params.userToUniversityId);
      }
    });
  }

  public retrieveUserToUniversity(userToUniversityId) {
    this.userToUniversityService()
      .find(userToUniversityId)
      .then(res => {
        this.userToUniversity = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

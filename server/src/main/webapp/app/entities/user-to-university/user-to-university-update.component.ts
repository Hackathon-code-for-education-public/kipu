import { Component, Vue, Inject } from 'vue-property-decorator';

import UniversityService from '@/entities/university/university.service';
import { IUniversity } from '@/shared/model/university.model';

import { IUserToUniversity, UserToUniversity } from '@/shared/model/user-to-university.model';
import UserToUniversityService from './user-to-university.service';

const validations: any = {
  userToUniversity: {
    scienceDegree: {},
  },
};

@Component({
  validations,
})
export default class UserToUniversityUpdate extends Vue {
  @Inject('userToUniversityService') private userToUniversityService: () => UserToUniversityService;
  public userToUniversity: IUserToUniversity = new UserToUniversity();

  @Inject('universityService') private universityService: () => UniversityService;

  public universities: IUniversity[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.userToUniversityId) {
        vm.retrieveUserToUniversity(to.params.userToUniversityId);
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
    if (this.userToUniversity.id) {
      this.userToUniversityService()
        .update(this.userToUniversity)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.userToUniversity.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.userToUniversityService()
        .create(this.userToUniversity)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.userToUniversity.created', { param: param.id });
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

  public retrieveUserToUniversity(userToUniversityId): void {
    this.userToUniversityService()
      .find(userToUniversityId)
      .then(res => {
        this.userToUniversity = res;
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

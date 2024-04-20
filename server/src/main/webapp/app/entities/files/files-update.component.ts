import { Component, Vue, Inject } from 'vue-property-decorator';

import UniversityService from '@/entities/university/university.service';
import { IUniversity } from '@/shared/model/university.model';

import ProfileService from '@/entities/profile/profile.service';
import { IProfile } from '@/shared/model/profile.model';

import { IFiles, Files } from '@/shared/model/files.model';
import FilesService from './files.service';

const validations: any = {
  files: {
    url: {},
    type: {},
    description: {},
  },
};

@Component({
  validations,
})
export default class FilesUpdate extends Vue {
  @Inject('filesService') private filesService: () => FilesService;
  public files: IFiles = new Files();

  @Inject('universityService') private universityService: () => UniversityService;

  public universities: IUniversity[] = [];

  @Inject('profileService') private profileService: () => ProfileService;

  public profiles: IProfile[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.filesId) {
        vm.retrieveFiles(to.params.filesId);
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
    if (this.files.id) {
      this.filesService()
        .update(this.files)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.files.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.filesService()
        .create(this.files)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.files.created', { param: param.id });
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

  public retrieveFiles(filesId): void {
    this.filesService()
      .find(filesId)
      .then(res => {
        this.files = res;
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
    this.profileService()
      .retrieve()
      .then(res => {
        this.profiles = res.data;
      });
  }
}

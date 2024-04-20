import { Component, Vue, Inject } from 'vue-property-decorator';

import UserToUniversityService from '@/entities/user-to-university/user-to-university.service';
import { IUserToUniversity } from '@/shared/model/user-to-university.model';

import ImageService from '@/entities/image/image.service';
import { IImage } from '@/shared/model/image.model';

import AdmissionService from '@/entities/admission/admission.service';
import { IAdmission } from '@/shared/model/admission.model';

import FilesService from '@/entities/files/files.service';
import { IFiles } from '@/shared/model/files.model';

import { IProfile, Profile } from '@/shared/model/profile.model';
import ProfileService from './profile.service';

const validations: any = {
  profile: {
    fullName: {},
    phoneNumber: {},
    description: {},
    rating: {},
  },
};

@Component({
  validations,
})
export default class ProfileUpdate extends Vue {
  @Inject('profileService') private profileService: () => ProfileService;
  public profile: IProfile = new Profile();

  @Inject('userToUniversityService') private userToUniversityService: () => UserToUniversityService;

  public userToUniversities: IUserToUniversity[] = [];

  @Inject('imageService') private imageService: () => ImageService;

  public images: IImage[] = [];

  @Inject('admissionService') private admissionService: () => AdmissionService;

  public admissions: IAdmission[] = [];

  @Inject('filesService') private filesService: () => FilesService;

  public files: IFiles[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.profileId) {
        vm.retrieveProfile(to.params.profileId);
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
    if (this.profile.id) {
      this.profileService()
        .update(this.profile)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.profile.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.profileService()
        .create(this.profile)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.profile.created', { param: param.id });
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

  public retrieveProfile(profileId): void {
    this.profileService()
      .find(profileId)
      .then(res => {
        this.profile = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userToUniversityService()
      .retrieve()
      .then(res => {
        this.userToUniversities = res.data;
      });
    this.imageService()
      .retrieve()
      .then(res => {
        this.images = res.data;
      });
    this.admissionService()
      .retrieve()
      .then(res => {
        this.admissions = res.data;
      });
    this.filesService()
      .retrieve()
      .then(res => {
        this.files = res.data;
      });
  }
}

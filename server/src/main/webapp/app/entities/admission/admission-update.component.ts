import { Component, Vue, Inject } from 'vue-property-decorator';

import UniversityService from '@/entities/university/university.service';
import { IUniversity } from '@/shared/model/university.model';

import DirectionService from '@/entities/direction/direction.service';
import { IDirection } from '@/shared/model/direction.model';

import ProfileService from '@/entities/profile/profile.service';
import { IProfile } from '@/shared/model/profile.model';

import { IAdmission, Admission } from '@/shared/model/admission.model';
import AdmissionService from './admission.service';

const validations: any = {
  admission: {},
};

@Component({
  validations,
})
export default class AdmissionUpdate extends Vue {
  @Inject('admissionService') private admissionService: () => AdmissionService;
  public admission: IAdmission = new Admission();

  @Inject('universityService') private universityService: () => UniversityService;

  public universities: IUniversity[] = [];

  @Inject('directionService') private directionService: () => DirectionService;

  public directions: IDirection[] = [];

  @Inject('profileService') private profileService: () => ProfileService;

  public profiles: IProfile[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.admissionId) {
        vm.retrieveAdmission(to.params.admissionId);
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
    if (this.admission.id) {
      this.admissionService()
        .update(this.admission)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.admission.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.admissionService()
        .create(this.admission)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.admission.created', { param: param.id });
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

  public retrieveAdmission(admissionId): void {
    this.admissionService()
      .find(admissionId)
      .then(res => {
        this.admission = res;
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
    this.directionService()
      .retrieve()
      .then(res => {
        this.directions = res.data;
      });
    this.profileService()
      .retrieve()
      .then(res => {
        this.profiles = res.data;
      });
  }
}

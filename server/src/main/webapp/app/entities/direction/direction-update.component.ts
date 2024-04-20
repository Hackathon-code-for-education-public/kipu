import { Component, Vue, Inject } from 'vue-property-decorator';

import EntrySubjectService from '@/entities/entry-subject/entry-subject.service';
import { IEntrySubject } from '@/shared/model/entry-subject.model';

import UniversityService from '@/entities/university/university.service';
import { IUniversity } from '@/shared/model/university.model';

import { IDirection, Direction } from '@/shared/model/direction.model';
import DirectionService from './direction.service';

const validations: any = {
  direction: {
    name: {},
  },
};

@Component({
  validations,
})
export default class DirectionUpdate extends Vue {
  @Inject('directionService') private directionService: () => DirectionService;
  public direction: IDirection = new Direction();

  @Inject('entrySubjectService') private entrySubjectService: () => EntrySubjectService;

  public entrySubjects: IEntrySubject[] = [];

  @Inject('universityService') private universityService: () => UniversityService;

  public universities: IUniversity[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.directionId) {
        vm.retrieveDirection(to.params.directionId);
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
    if (this.direction.id) {
      this.directionService()
        .update(this.direction)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.direction.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.directionService()
        .create(this.direction)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.direction.created', { param: param.id });
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

  public retrieveDirection(directionId): void {
    this.directionService()
      .find(directionId)
      .then(res => {
        this.direction = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.entrySubjectService()
      .retrieve()
      .then(res => {
        this.entrySubjects = res.data;
      });
    this.universityService()
      .retrieve()
      .then(res => {
        this.universities = res.data;
      });
  }
}

import { Component, Vue, Inject } from 'vue-property-decorator';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import DirectionService from '@/entities/direction/direction.service';
import { IDirection } from '@/shared/model/direction.model';

import { IEntrySubject, EntrySubject } from '@/shared/model/entry-subject.model';
import EntrySubjectService from './entry-subject.service';

const validations: any = {
  entrySubject: {
    name: {},
    minimumScore: {},
    examDate: {},
  },
};

@Component({
  validations,
})
export default class EntrySubjectUpdate extends Vue {
  @Inject('entrySubjectService') private entrySubjectService: () => EntrySubjectService;
  public entrySubject: IEntrySubject = new EntrySubject();

  @Inject('directionService') private directionService: () => DirectionService;

  public directions: IDirection[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.entrySubjectId) {
        vm.retrieveEntrySubject(to.params.entrySubjectId);
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
    if (this.entrySubject.id) {
      this.entrySubjectService()
        .update(this.entrySubject)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.entrySubject.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.entrySubjectService()
        .create(this.entrySubject)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.entrySubject.created', { param: param.id });
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

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.entrySubject[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.entrySubject[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.entrySubject[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.entrySubject[field] = null;
    }
  }

  public retrieveEntrySubject(entrySubjectId): void {
    this.entrySubjectService()
      .find(entrySubjectId)
      .then(res => {
        res.examDate = new Date(res.examDate);
        this.entrySubject = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.directionService()
      .retrieve()
      .then(res => {
        this.directions = res.data;
      });
  }
}

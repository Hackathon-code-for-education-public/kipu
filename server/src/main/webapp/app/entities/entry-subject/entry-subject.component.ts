import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IEntrySubject } from '@/shared/model/entry-subject.model';

import EntrySubjectService from './entry-subject.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class EntrySubject extends Vue {
  @Inject('entrySubjectService') private entrySubjectService: () => EntrySubjectService;
  private removeId: number = null;

  public entrySubjects: IEntrySubject[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllEntrySubjects();
  }

  public clear(): void {
    this.retrieveAllEntrySubjects();
  }

  public retrieveAllEntrySubjects(): void {
    this.isFetching = true;

    this.entrySubjectService()
      .retrieve()
      .then(
        res => {
          this.entrySubjects = res.data;
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

  public prepareRemove(instance: IEntrySubject): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeEntrySubject(): void {
    this.entrySubjectService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('hackatonappApp.entrySubject.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllEntrySubjects();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

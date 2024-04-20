import { Component, Vue, Inject } from 'vue-property-decorator';

import { IEntrySubject } from '@/shared/model/entry-subject.model';
import EntrySubjectService from './entry-subject.service';

@Component
export default class EntrySubjectDetails extends Vue {
  @Inject('entrySubjectService') private entrySubjectService: () => EntrySubjectService;
  public entrySubject: IEntrySubject = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.entrySubjectId) {
        vm.retrieveEntrySubject(to.params.entrySubjectId);
      }
    });
  }

  public retrieveEntrySubject(entrySubjectId) {
    this.entrySubjectService()
      .find(entrySubjectId)
      .then(res => {
        this.entrySubject = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

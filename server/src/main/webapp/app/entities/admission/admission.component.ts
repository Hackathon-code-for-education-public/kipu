import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IAdmission } from '@/shared/model/admission.model';

import AdmissionService from './admission.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Admission extends Vue {
  @Inject('admissionService') private admissionService: () => AdmissionService;
  private removeId: number = null;

  public admissions: IAdmission[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllAdmissions();
  }

  public clear(): void {
    this.retrieveAllAdmissions();
  }

  public retrieveAllAdmissions(): void {
    this.isFetching = true;

    this.admissionService()
      .retrieve()
      .then(
        res => {
          this.admissions = res.data;
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

  public prepareRemove(instance: IAdmission): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeAdmission(): void {
    this.admissionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('hackatonappApp.admission.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllAdmissions();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

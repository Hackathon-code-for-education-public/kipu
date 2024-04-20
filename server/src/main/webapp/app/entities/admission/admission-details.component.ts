import { Component, Vue, Inject } from 'vue-property-decorator';

import { IAdmission } from '@/shared/model/admission.model';
import AdmissionService from './admission.service';

@Component
export default class AdmissionDetails extends Vue {
  @Inject('admissionService') private admissionService: () => AdmissionService;
  public admission: IAdmission = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.admissionId) {
        vm.retrieveAdmission(to.params.admissionId);
      }
    });
  }

  public retrieveAdmission(admissionId) {
    this.admissionService()
      .find(admissionId)
      .then(res => {
        this.admission = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

import { Component, Vue, Inject } from 'vue-property-decorator';

import { IDirection } from '@/shared/model/direction.model';
import DirectionService from './direction.service';

@Component
export default class DirectionDetails extends Vue {
  @Inject('directionService') private directionService: () => DirectionService;
  public direction: IDirection = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.directionId) {
        vm.retrieveDirection(to.params.directionId);
      }
    });
  }

  public retrieveDirection(directionId) {
    this.directionService()
      .find(directionId)
      .then(res => {
        this.direction = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

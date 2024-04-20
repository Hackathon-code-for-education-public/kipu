import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IDirection } from '@/shared/model/direction.model';

import DirectionService from './direction.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Direction extends Vue {
  @Inject('directionService') private directionService: () => DirectionService;
  private removeId: number = null;

  public directions: IDirection[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllDirections();
  }

  public clear(): void {
    this.retrieveAllDirections();
  }

  public retrieveAllDirections(): void {
    this.isFetching = true;

    this.directionService()
      .retrieve()
      .then(
        res => {
          this.directions = res.data;
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

  public prepareRemove(instance: IDirection): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeDirection(): void {
    this.directionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('hackatonappApp.direction.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllDirections();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

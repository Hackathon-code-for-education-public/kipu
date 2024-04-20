import { Component, Vue, Inject } from 'vue-property-decorator';

import UserToUniversityService from '@/entities/user-to-university/user-to-university.service';
import { IUserToUniversity } from '@/shared/model/user-to-university.model';

import ProductService from '@/entities/product/product.service';
import { IProduct } from '@/shared/model/product.model';

import ImageService from '@/entities/image/image.service';
import { IImage } from '@/shared/model/image.model';

import CommentService from '@/entities/comment/comment.service';
import { IComment } from '@/shared/model/comment.model';

import AlbumService from '@/entities/album/album.service';
import { IAlbum } from '@/shared/model/album.model';

import FilesService from '@/entities/files/files.service';
import { IFiles } from '@/shared/model/files.model';

import DirectionService from '@/entities/direction/direction.service';
import { IDirection } from '@/shared/model/direction.model';

import { IUniversity, University } from '@/shared/model/university.model';
import UniversityService from './university.service';

const validations: any = {
  university: {
    name: {},
    desciption: {},
    address: {},
    phoneNumber: {},
    email: {},
    site: {},
    phoneNumbers: {},
    emails: {},
    schedule: {},
    responsiblePerson: {},
  },
};

@Component({
  validations,
})
export default class UniversityUpdate extends Vue {
  @Inject('universityService') private universityService: () => UniversityService;
  public university: IUniversity = new University();

  @Inject('userToUniversityService') private userToUniversityService: () => UserToUniversityService;

  public userToUniversities: IUserToUniversity[] = [];

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];

  @Inject('imageService') private imageService: () => ImageService;

  public images: IImage[] = [];

  @Inject('commentService') private commentService: () => CommentService;

  public comments: IComment[] = [];

  @Inject('albumService') private albumService: () => AlbumService;

  public albums: IAlbum[] = [];

  @Inject('filesService') private filesService: () => FilesService;

  public files: IFiles[] = [];

  @Inject('directionService') private directionService: () => DirectionService;

  public directions: IDirection[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.universityId) {
        vm.retrieveUniversity(to.params.universityId);
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
    if (this.university.id) {
      this.universityService()
        .update(this.university)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.university.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.universityService()
        .create(this.university)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('hackatonappApp.university.created', { param: param.id });
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

  public retrieveUniversity(universityId): void {
    this.universityService()
      .find(universityId)
      .then(res => {
        this.university = res;
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
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
    this.imageService()
      .retrieve()
      .then(res => {
        this.images = res.data;
      });
    this.commentService()
      .retrieve()
      .then(res => {
        this.comments = res.data;
      });
    this.albumService()
      .retrieve()
      .then(res => {
        this.albums = res.data;
      });
    this.filesService()
      .retrieve()
      .then(res => {
        this.files = res.data;
      });
    this.directionService()
      .retrieve()
      .then(res => {
        this.directions = res.data;
      });
  }
}

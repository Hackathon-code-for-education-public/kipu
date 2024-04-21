// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.common with an alias.
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import Vue2Filters from 'vue2-filters';
import { ToastPlugin } from 'bootstrap-vue';
import router from './router';
import * as config from './shared/config/config';
import * as bootstrapVueConfig from './shared/config/config-bootstrap-vue';
import JhiItemCountComponent from './shared/jhi-item-count.vue';
import JhiSortIndicatorComponent from './shared/sort/jhi-sort-indicator.vue';
import InfiniteLoading from 'vue-infinite-loading';
import HealthService from './admin/health/health.service';
import MetricsService from './admin/metrics/metrics.service';
import LogsService from './admin/logs/logs.service';
import ConfigurationService from '@/admin/configuration/configuration.service';
import ActivateService from './account/activate/activate.service';
import RegisterService from './account/register/register.service';
import UserManagementService from '@/admin/user-management/user-management.service';
import LoginService from './account/login.service';
import AccountService from './account/account.service';
import AdmissionService from '@/entities/admission/admission.service';
import UserToUniversityService from '@/entities/user-to-university/user-to-university.service';
import UniversityService from '@/entities/university/university.service';
import ProfileService from '@/entities/profile/profile.service';
import ProductService from '@/entities/product/product.service';
import ImageService from '@/entities/image/image.service';
import FilesService from '@/entities/files/files.service';
import EntrySubjectService from '@/entities/entry-subject/entry-subject.service';
import DirectionService from '@/entities/direction/direction.service';
import CommentService from '@/entities/comment/comment.service';
import AlbumService from '@/entities/album/album.service';

import '../content/scss/vendor.scss';
import TranslationService from '@/locale/translation.service';

import UserOAuth2Service from '@/entities/user/user.oauth2.service';
/* tslint:disable */

// jhipster-needle-add-entity-service-to-main-import - JHipster will import entities services here

/* tslint:enable */
Vue.config.productionTip = false;
config.initVueApp(Vue);
config.initFortAwesome(Vue);
bootstrapVueConfig.initBootstrapVue(Vue);
Vue.use(Vue2Filters);
Vue.use(ToastPlugin);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('jhi-item-count', JhiItemCountComponent);
Vue.component('jhi-sort-indicator', JhiSortIndicatorComponent);
Vue.component('infinite-loading', InfiniteLoading);
const i18n = config.initI18N(Vue);
const store = config.initVueXStore(Vue);

const translationService = new TranslationService(store, i18n);
const loginService = new LoginService();
const accountService = new AccountService(store, translationService, router);

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/not-found');
  }

  if (to.meta && to.meta.authorities && to.meta.authorities.length > 0) {
    accountService.hasAnyAuthorityAndCheckAuth(to.meta.authorities).then(value => {
      if (!value) {
        sessionStorage.setItem('requested-url', to.fullPath);
        next('/forbidden');
      } else {
        next();
      }
    });
  } else {
    // no authorities, so just proceed
    next();
  }
});

/* tslint:disable */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  provide: {
    loginService: () => loginService,
    activateService: () => new ActivateService(),
    registerService: () => new RegisterService(),
    userService: () => new UserManagementService(),
    healthService: () => new HealthService(),
    configurationService: () => new ConfigurationService(),
    logsService: () => new LogsService(),
    metricsService: () => new MetricsService(),

    userOAuth2Service: () => new UserOAuth2Service(),
    admissionService: () => new AdmissionService(),
    albumService: () => new AlbumService(),
    commentService: () => new CommentService(),
    directionService: () => new DirectionService(),
    entrySubjectService: () => new EntrySubjectService(),
    filesService: () => new FilesService(),
    imageService: () => new ImageService(),
    productService: () => new ProductService(),
    profileService: () => new ProfileService(),
    universityService: () => new UniversityService(),
    userToUniversityService: () => new UserToUniversityService(),
    translationService: () => translationService,
    // jhipster-needle-add-entity-service-to-main - JHipster will import entities services here
    accountService: () => accountService,
  },
  i18n,
  store,
});

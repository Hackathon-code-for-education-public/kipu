const JhiAdmissionComponent = () => import('@/entities/admission/admission.vue');
const JhiAdmissionViewComponent = () => import('@/entities/admission/admission-details.vue');
const JhiAdmissionEditComponent = () => import('@/entities/admission/admission-update.vue');
const JhiUniversityComponent = () => import('@/entities/university/university.vue');
const JhiUniversityViewComponent = () => import('@/entities/university/university-details.vue');
const JhiUniversityEditComponent = () => import('@/entities/university/university-update.vue');
import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/entities/admission',
    name: 'Admission',
    component: JhiAdmissionComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/entities/admission/view',
    name: 'AdmissionView',
    component: JhiAdmissionViewComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/entities/admission/edit',
    name: 'AdmissionCreate',
    component: JhiAdmissionEditComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/entities/university',
    name: 'University',
    component: JhiUniversityComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/entities/university/view',
    name: 'UniversityView',
    component: JhiUniversityViewComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/entities/university/edit',
    name: 'UniversityCreate',
    component: JhiUniversityEditComponent,
    meta: { authorities: [Authority.ADMIN] },
  }
];

const Admission = () => import('@/entities/admission/admission.vue');
const AdmissionUpdate = () => import('@/entities/admission/admission-update.vue');
const AdmissionView = () => import('@/entities/admission/admission-details.vue');

const University = () => import('@/entities/university/university.vue');
const UniversityDetails = () => import('@/entities/university/university-details.vue');
const UniversityUpdate = () => import('@/entities/university/university-update.vue');

const Album = () => import('@/entities/album/album.vue');
const AlbumView = () => import('@/entities/album/album-details.vue');
const AlbumUpdate = () => import('@/entities/album/album-update.vue');

const Comment = () => import('@/entities/comment/comment.vue');
const CommentView = () => import('@/entities/comment/comment-details.vue');
const CommentUpdate = () => import('@/entities/comment/comment-update.vue');

const Direction = () => import('@/entities/direction/direction.vue');
const DirectionView = () => import('@/entities/direction/direction-details.vue');
const DirectionUpdate = () => import('@/entities/direction/direction-update.vue');

const EntrySubject = () => import('@/entities/entry-subject/entry-subject.vue');
const EntrySubjectView = () => import('@/entities/entry-subject/entry-subject-details.vue');
const EntrySubjectUpdate = () => import('@/entities/entry-subject/entry-subject-update.vue');

const Files = () => import('@/entities/files/files.vue');
const FilesView = () => import('@/entities/files/files-details.vue');
const FilesUpdate = () => import('@/entities/files/files-update.vue');

const Image = () => import('@/entities/image/image.vue');
const ImageView = () => import('@/entities/image/image-details.vue');
const ImageUpdate = () => import('@/entities/image/image-update.vue');

const Product = () => import('@/entities/product/product.vue');
const ProductView = () => import('@/entities/product/product-details.vue');
const ProductUpdate = () => import('@/entities/product/product-update.vue');

const Profile = () => import('@/entities/profile/profile.vue');
const ProfileView = () => import('@/entities/profile/profile-details.vue');
const ProfileUpdate = () => import('@/entities/profile/profile-update.vue');

const UserToUniversity = () => import('@/entities/user-to-university/user-to-university.vue');
const UserToUniversityView = () => import('@/entities/user-to-university/user-to-university-details.vue');
const UserToUniversityUpdate = () => import('@/entities/user-to-university/user-to-university-update.vue');

import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/admission',
    name: 'Admission',
    component: Admission,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/admission/new',
    name: 'AdmissionCreate',
    component: AdmissionUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/admission/:admissionId/edit',
    name: 'AdmissionEdit',
    component: AdmissionUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/admission/:admissionId/view',
    name: 'AdmissionView',
    component: AdmissionView,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/album',
    name: 'Album',
    component: Album,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/album/new',
    name: 'AlbumCreate',
    component: AlbumUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/album/:albumId/edit',
    name: 'AlbumEdit',
    component: AlbumUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/album/:albumId/view',
    name: 'AlbumView',
    component: AlbumView,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/comment/new',
    name: 'CommentCreate',
    component: CommentUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/comment/:commentId/edit',
    name: 'CommentEdit',
    component: CommentUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/comment/:commentId/view',
    name: 'CommentView',
    component: CommentView,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/direction',
    name: 'Direction',
    component: Direction,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/direction/new',
    name: 'DirectionCreate',
    component: DirectionUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/direction/:directionId/edit',
    name: 'DirectionEdit',
    component: DirectionUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/direction/:directionId/view',
    name: 'DirectionView',
    component: DirectionView,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/entry-subject',
    name: 'EntrySubject',
    component: EntrySubject,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/entry-subject/new',
    name: 'EntrySubjectCreate',
    component: EntrySubjectUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/entry-subject/:entrySubjectId/edit',
    name: 'EntrySubjectEdit',
    component: EntrySubjectUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/entry-subject/:entrySubjectId/view',
    name: 'EntrySubjectView',
    component: EntrySubjectView,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/files',
    name: 'Files',
    component: Files,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/files/new',
    name: 'FilesCreate',
    component: FilesUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/files/:filesId/edit',
    name: 'FilesEdit',
    component: FilesUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/files/:filesId/view',
    name: 'FilesView',
    component: FilesView,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/image',
    name: 'Image',
    component: Image,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/image/new',
    name: 'ImageCreate',
    component: ImageUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/image/:imageId/edit',
    name: 'ImageEdit',
    component: ImageUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/image/:imageId/view',
    name: 'ImageView',
    component: ImageView,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/product/new',
    name: 'ProductCreate',
    component: ProductUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/product/:productId/edit',
    name: 'ProductEdit',
    component: ProductUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/product/:productId/view',
    name: 'ProductView',
    component: ProductView,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/profile/new',
    name: 'ProfileCreate',
    component: ProfileUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/profile/:profileId/edit',
    name: 'ProfileEdit',
    component: ProfileUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/profile/:profileId/view',
    name: 'ProfileView',
    component: ProfileView,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/university',
    name: 'University',
    component: University,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/university/new',
    name: 'UniversityCreate',
    component: UniversityUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/university/:universityId/edit',
    name: 'UniversityEdit',
    component: UniversityUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/university/:universityId/view',
    name: 'UniversityView',
    component: UniversityDetails,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/user-to-university',
    name: 'UserToUniversity',
    component: UserToUniversity,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/user-to-university/new',
    name: 'UserToUniversityCreate',
    component: UserToUniversityUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/user-to-university/:userToUniversityId/edit',
    name: 'UserToUniversityEdit',
    component: UserToUniversityUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/user-to-university/:userToUniversityId/view',
    name: 'UserToUniversityView',
    component: UserToUniversityView,
    meta: { authorities: [Authority.ADMIN] },
  },
];

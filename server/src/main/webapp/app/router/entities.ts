import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Profile = () => import('@/entities/profile/profile.vue');
// prettier-ignore
const ProfileUpdate = () => import('@/entities/profile/profile-update.vue');
// prettier-ignore
const ProfileDetails = () => import('@/entities/profile/profile-details.vue');
// prettier-ignore
const University = () => import('@/entities/university/university.vue');
// prettier-ignore
const UniversityUpdate = () => import('@/entities/university/university-update.vue');
// prettier-ignore
const UniversityDetails = () => import('@/entities/university/university-details.vue');
// prettier-ignore
const Album = () => import('@/entities/album/album.vue');
// prettier-ignore
const AlbumUpdate = () => import('@/entities/album/album-update.vue');
// prettier-ignore
const AlbumDetails = () => import('@/entities/album/album-details.vue');
// prettier-ignore
const UserToUniversity = () => import('@/entities/user-to-university/user-to-university.vue');
// prettier-ignore
const UserToUniversityUpdate = () => import('@/entities/user-to-university/user-to-university-update.vue');
// prettier-ignore
const UserToUniversityDetails = () => import('@/entities/user-to-university/user-to-university-details.vue');
// prettier-ignore
const Comment = () => import('@/entities/comment/comment.vue');
// prettier-ignore
const CommentUpdate = () => import('@/entities/comment/comment-update.vue');
// prettier-ignore
const CommentDetails = () => import('@/entities/comment/comment-details.vue');
// prettier-ignore
const Image = () => import('@/entities/image/image.vue');
// prettier-ignore
const ImageUpdate = () => import('@/entities/image/image-update.vue');
// prettier-ignore
const ImageDetails = () => import('@/entities/image/image-details.vue');
// prettier-ignore
const Files = () => import('@/entities/files/files.vue');
// prettier-ignore
const FilesUpdate = () => import('@/entities/files/files-update.vue');
// prettier-ignore
const FilesDetails = () => import('@/entities/files/files-details.vue');
// prettier-ignore
const Direction = () => import('@/entities/direction/direction.vue');
// prettier-ignore
const DirectionUpdate = () => import('@/entities/direction/direction-update.vue');
// prettier-ignore
const DirectionDetails = () => import('@/entities/direction/direction-details.vue');
// prettier-ignore
const EntrySubject = () => import('@/entities/entry-subject/entry-subject.vue');
// prettier-ignore
const EntrySubjectUpdate = () => import('@/entities/entry-subject/entry-subject-update.vue');
// prettier-ignore
const EntrySubjectDetails = () => import('@/entities/entry-subject/entry-subject-details.vue');
// prettier-ignore
const Admission = () => import('@/entities/admission/admission.vue');
// prettier-ignore
const AdmissionUpdate = () => import('@/entities/admission/admission-update.vue');
// prettier-ignore
const AdmissionDetails = () => import('@/entities/admission/admission-details.vue');
// prettier-ignore
const Product = () => import('@/entities/product/product.vue');
// prettier-ignore
const ProductUpdate = () => import('@/entities/product/product-update.vue');
// prettier-ignore
const ProductDetails = () => import('@/entities/product/product-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profile/new',
    name: 'ProfileCreate',
    component: ProfileUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profile/:profileId/edit',
    name: 'ProfileEdit',
    component: ProfileUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profile/:profileId/view',
    name: 'ProfileView',
    component: ProfileDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/university',
    name: 'University',
    component: University,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/university/new',
    name: 'UniversityCreate',
    component: UniversityUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/university/:universityId/edit',
    name: 'UniversityEdit',
    component: UniversityUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/university/:universityId/view',
    name: 'UniversityView',
    component: UniversityDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/album',
    name: 'Album',
    component: Album,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/album/new',
    name: 'AlbumCreate',
    component: AlbumUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/album/:albumId/edit',
    name: 'AlbumEdit',
    component: AlbumUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/album/:albumId/view',
    name: 'AlbumView',
    component: AlbumDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/user-to-university',
    name: 'UserToUniversity',
    component: UserToUniversity,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/user-to-university/new',
    name: 'UserToUniversityCreate',
    component: UserToUniversityUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/user-to-university/:userToUniversityId/edit',
    name: 'UserToUniversityEdit',
    component: UserToUniversityUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/user-to-university/:userToUniversityId/view',
    name: 'UserToUniversityView',
    component: UserToUniversityDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/new',
    name: 'CommentCreate',
    component: CommentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/:commentId/edit',
    name: 'CommentEdit',
    component: CommentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/:commentId/view',
    name: 'CommentView',
    component: CommentDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/image',
    name: 'Image',
    component: Image,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/image/new',
    name: 'ImageCreate',
    component: ImageUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/image/:imageId/edit',
    name: 'ImageEdit',
    component: ImageUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/image/:imageId/view',
    name: 'ImageView',
    component: ImageDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/files',
    name: 'Files',
    component: Files,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/files/new',
    name: 'FilesCreate',
    component: FilesUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/files/:filesId/edit',
    name: 'FilesEdit',
    component: FilesUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/files/:filesId/view',
    name: 'FilesView',
    component: FilesDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/direction',
    name: 'Direction',
    component: Direction,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/direction/new',
    name: 'DirectionCreate',
    component: DirectionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/direction/:directionId/edit',
    name: 'DirectionEdit',
    component: DirectionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/direction/:directionId/view',
    name: 'DirectionView',
    component: DirectionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entry-subject',
    name: 'EntrySubject',
    component: EntrySubject,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entry-subject/new',
    name: 'EntrySubjectCreate',
    component: EntrySubjectUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entry-subject/:entrySubjectId/edit',
    name: 'EntrySubjectEdit',
    component: EntrySubjectUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entry-subject/:entrySubjectId/view',
    name: 'EntrySubjectView',
    component: EntrySubjectDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/admission',
    name: 'Admission',
    component: Admission,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/admission/new',
    name: 'AdmissionCreate',
    component: AdmissionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/admission/:admissionId/edit',
    name: 'AdmissionEdit',
    component: AdmissionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/admission/:admissionId/view',
    name: 'AdmissionView',
    component: AdmissionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/new',
    name: 'ProductCreate',
    component: ProductUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/:productId/edit',
    name: 'ProductEdit',
    component: ProductUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/:productId/view',
    name: 'ProductView',
    component: ProductDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];

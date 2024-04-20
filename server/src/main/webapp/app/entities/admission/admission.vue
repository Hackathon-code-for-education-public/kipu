<template>
  <div>
    <h2 id="page-heading" data-cy="AdmissionHeading">
      <span v-text="$t('hackatonappApp.admission.home.title')" id="admission-heading">Admissions</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('hackatonappApp.admission.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'AdmissionCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-admission"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('hackatonappApp.admission.home.createLabel')"> Create a new Admission </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && admissions && admissions.length === 0">
      <span v-text="$t('hackatonappApp.admission.home.notFound')">No admissions found</span>
    </div>
    <div class="table-responsive" v-if="admissions && admissions.length > 0">
      <table class="table table-striped" aria-describedby="admissions">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.admission.university')">University</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.admission.direction')">Direction</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.admission.profile')">Profile</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admission in admissions" :key="admission.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'AdmissionView', params: { admissionId: admission.id } }">{{ admission.id }}</router-link>
            </td>
            <td>
              <div v-if="admission.university">
                <router-link :to="{ name: 'UniversityView', params: { universityId: admission.university.id } }">{{
                  admission.university.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="admission.direction">
                <router-link :to="{ name: 'DirectionView', params: { directionId: admission.direction.id } }">{{
                  admission.direction.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="admission.profile">
                <router-link :to="{ name: 'ProfileView', params: { profileId: admission.profile.id } }">{{
                  admission.profile.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'AdmissionView', params: { admissionId: admission.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'AdmissionEdit', params: { admissionId: admission.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(admission)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="hackatonappApp.admission.delete.question" data-cy="admissionDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-admission-heading" v-text="$t('hackatonappApp.admission.delete.question', { id: removeId })">
          Are you sure you want to delete this Admission?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-admission"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeAdmission()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./admission.component.ts"></script>

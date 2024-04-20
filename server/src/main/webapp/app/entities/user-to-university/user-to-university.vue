<template>
  <div>
    <h2 id="page-heading" data-cy="UserToUniversityHeading">
      <span v-text="$t('hackatonappApp.userToUniversity.home.title')" id="user-to-university-heading">User To Universities</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('hackatonappApp.userToUniversity.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'UserToUniversityCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-user-to-university"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('hackatonappApp.userToUniversity.home.createLabel')"> Create a new User To University </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && userToUniversities && userToUniversities.length === 0">
      <span v-text="$t('hackatonappApp.userToUniversity.home.notFound')">No userToUniversities found</span>
    </div>
    <div class="table-responsive" v-if="userToUniversities && userToUniversities.length > 0">
      <table class="table table-striped" aria-describedby="userToUniversities">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.userToUniversity.scienceDegree')">Science Degree</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="userToUniversity in userToUniversities" :key="userToUniversity.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'UserToUniversityView', params: { userToUniversityId: userToUniversity.id } }">{{
                userToUniversity.id
              }}</router-link>
            </td>
            <td v-text="$t('hackatonappApp.ScienceDegree.' + userToUniversity.scienceDegree)">{{ userToUniversity.scienceDegree }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'UserToUniversityView', params: { userToUniversityId: userToUniversity.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'UserToUniversityEdit', params: { userToUniversityId: userToUniversity.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(userToUniversity)"
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
        ><span
          id="hackatonappApp.userToUniversity.delete.question"
          data-cy="userToUniversityDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-userToUniversity-heading" v-text="$t('hackatonappApp.userToUniversity.delete.question', { id: removeId })">
          Are you sure you want to delete this User To University?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-userToUniversity"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeUserToUniversity()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./user-to-university.component.ts"></script>

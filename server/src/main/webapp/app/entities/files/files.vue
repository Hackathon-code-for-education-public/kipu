<template>
  <div>
    <h2 id="page-heading" data-cy="FilesHeading">
      <span v-text="$t('hackatonappApp.files.home.title')" id="files-heading">Files</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('hackatonappApp.files.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'FilesCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-files"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('hackatonappApp.files.home.createLabel')"> Create a new Files </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && files && files.length === 0">
      <span v-text="$t('hackatonappApp.files.home.notFound')">No files found</span>
    </div>
    <div class="table-responsive" v-if="files && files.length > 0">
      <table class="table table-striped" aria-describedby="files">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.files.url')">Url</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.files.type')">Type</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.files.description')">Description</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.files.university')">University</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.files.profile')">Profile</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="files in files" :key="files.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'FilesView', params: { filesId: files.id } }">{{ files.id }}</router-link>
            </td>
            <td>{{ files.url }}</td>
            <td v-text="$t('hackatonappApp.FileType.' + files.type)">{{ files.type }}</td>
            <td>{{ files.description }}</td>
            <td>
              <div v-if="files.university">
                <router-link :to="{ name: 'UniversityView', params: { universityId: files.university.id } }">{{
                  files.university.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="files.profile">
                <router-link :to="{ name: 'ProfileView', params: { profileId: files.profile.id } }">{{ files.profile.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'FilesView', params: { filesId: files.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'FilesEdit', params: { filesId: files.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(files)"
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
        ><span id="hackatonappApp.files.delete.question" data-cy="filesDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-files-heading" v-text="$t('hackatonappApp.files.delete.question', { id: removeId })">
          Are you sure you want to delete this Files?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-files"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeFiles()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./files.component.ts"></script>

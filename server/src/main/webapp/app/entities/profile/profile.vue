<template>
  <div>
    <h2 id="page-heading" data-cy="ProfileHeading">
      <span v-text="$t('hackatonappApp.profile.home.title')" id="profile-heading">Profiles</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('hackatonappApp.profile.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ProfileCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-profile"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('hackatonappApp.profile.home.createLabel')"> Create a new Profile </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && profiles && profiles.length === 0">
      <span v-text="$t('hackatonappApp.profile.home.notFound')">No profiles found</span>
    </div>
    <div class="table-responsive" v-if="profiles && profiles.length > 0">
      <table class="table table-striped" aria-describedby="profiles">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.profile.fullName')">Full Name</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.profile.phoneNumber')">Phone Number</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.profile.description')">Description</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.profile.rating')">Rating</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.profile.userId')">User Id</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.profile.avatar')">Avatar</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="profile in profiles" :key="profile.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProfileView', params: { profileId: profile.id } }">{{ profile.id }}</router-link>
            </td>
            <td>{{ profile.fullName }}</td>
            <td>{{ profile.phoneNumber }}</td>
            <td>{{ profile.description }}</td>
            <td>{{ profile.rating }}</td>
            <td>
              <div v-if="profile.userId">
                <router-link :to="{ name: 'UserToUniversityView', params: { userToUniversityId: profile.userId.id } }">{{
                  profile.userId.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="profile.avatar">
                <router-link :to="{ name: 'ImageView', params: { imageId: profile.avatar.id } }">{{ profile.avatar.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ProfileView', params: { profileId: profile.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ProfileEdit', params: { profileId: profile.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(profile)"
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
        ><span id="hackatonappApp.profile.delete.question" data-cy="profileDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-profile-heading" v-text="$t('hackatonappApp.profile.delete.question', { id: removeId })">
          Are you sure you want to delete this Profile?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-profile"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeProfile()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./profile.component.ts"></script>

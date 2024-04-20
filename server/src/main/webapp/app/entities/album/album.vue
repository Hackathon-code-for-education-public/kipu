<template>
  <div>
    <h2 id="page-heading" data-cy="AlbumHeading">
      <span v-text="$t('hackatonappApp.album.home.title')" id="album-heading">Albums</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('hackatonappApp.album.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'AlbumCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-album"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('hackatonappApp.album.home.createLabel')"> Create a new Album </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && albums && albums.length === 0">
      <span v-text="$t('hackatonappApp.album.home.notFound')">No albums found</span>
    </div>
    <div class="table-responsive" v-if="albums && albums.length > 0">
      <table class="table table-striped" aria-describedby="albums">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.album.name')">Name</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.album.university')">University</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="album in albums" :key="album.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'AlbumView', params: { albumId: album.id } }">{{ album.id }}</router-link>
            </td>
            <td>{{ album.name }}</td>
            <td>
              <div v-if="album.university">
                <router-link :to="{ name: 'UniversityView', params: { universityId: album.university.id } }">{{
                  album.university.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'AlbumView', params: { albumId: album.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'AlbumEdit', params: { albumId: album.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(album)"
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
        ><span id="hackatonappApp.album.delete.question" data-cy="albumDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-album-heading" v-text="$t('hackatonappApp.album.delete.question', { id: removeId })">
          Are you sure you want to delete this Album?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-album"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeAlbum()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./album.component.ts"></script>

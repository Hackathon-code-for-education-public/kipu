<template>
  <div>
    <h2 id="page-heading" data-cy="UniversityHeading">
      <span v-text="$t('hackatonappApp.university.home.title')" id="university-heading">Universities</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('hackatonappApp.university.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'UniversityCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-university"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('hackatonappApp.university.home.createLabel')"> Create a new University </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && universities && universities.length === 0">
      <span v-text="$t('hackatonappApp.university.home.notFound')">No universities found</span>
    </div>
    <div class="table-responsive" v-if="universities && universities.length > 0">
      <table class="table table-striped" aria-describedby="universities">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.university.name')">Name</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.university.desciption')">Desciption</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.university.address')">Address</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.university.phoneNumber')">Phone Number</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.university.email')">Email</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.university.site')">Site</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.university.phoneNumbers')">Phone Numbers</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.university.emails')">Emails</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.university.schedule')">Schedule</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.university.responsiblePerson')">Responsible Person</span></th>
            <th scope="row"><span v-text="$t('hackatonappApp.university.id')">Id</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="university in universities" :key="university.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'UniversityView', params: { universityId: university.id } }">{{ university.id }}</router-link>
            </td>
            <td>{{ university.name }}</td>
            <td>{{ university.desciption }}</td>
            <td>{{ university.address }}</td>
            <td>{{ university.phoneNumber }}</td>
            <td>{{ university.email }}</td>
            <td>{{ university.site }}</td>
            <td>{{ university.phoneNumbers }}</td>
            <td>{{ university.emails }}</td>
            <td>{{ university.schedule }}</td>
            <td>{{ university.responsiblePerson }}</td>
            <td>
              <div v-if="university.id">
                <router-link :to="{ name: 'UserToUniversityView', params: { userToUniversityId: university.id.id } }">{{
                  university.id.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'UniversityView', params: { universityId: university.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'UniversityEdit', params: { universityId: university.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(university)"
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
        ><span id="hackatonappApp.university.delete.question" data-cy="universityDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-university-heading" v-text="$t('hackatonappApp.university.delete.question', { id: removeId })">
          Are you sure you want to delete this University?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-university"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeUniversity()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./university.component.ts"></script>

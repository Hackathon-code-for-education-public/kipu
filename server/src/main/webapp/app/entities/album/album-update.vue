<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="hackatonappApp.album.home.createOrEditLabel"
          data-cy="AlbumCreateUpdateHeading"
          v-text="$t('hackatonappApp.album.home.createOrEditLabel')"
        >
          Create or edit a Album
        </h2>
        <div>
          <div class="form-group" v-if="album.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="album.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.album.name')" for="album-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="album-name"
              data-cy="name"
              :class="{ valid: !$v.album.name.$invalid, invalid: $v.album.name.$invalid }"
              v-model="$v.album.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.album.university')" for="album-university">University</label>
            <select class="form-control" id="album-university" data-cy="university" name="university" v-model="album.university">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="album.university && universityOption.id === album.university.id ? album.university : universityOption"
                v-for="universityOption in universities"
                :key="universityOption.id"
              >
                {{ universityOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.album.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./album-update.component.ts"></script>

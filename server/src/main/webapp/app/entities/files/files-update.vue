<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="hackatonappApp.files.home.createOrEditLabel"
          data-cy="FilesCreateUpdateHeading"
          v-text="$t('hackatonappApp.files.home.createOrEditLabel')"
        >
          Create or edit a Files
        </h2>
        <div>
          <div class="form-group" v-if="files.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="files.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.files.url')" for="files-url">Url</label>
            <input
              type="text"
              class="form-control"
              name="url"
              id="files-url"
              data-cy="url"
              :class="{ valid: !$v.files.url.$invalid, invalid: $v.files.url.$invalid }"
              v-model="$v.files.url.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.files.type')" for="files-type">Type</label>
            <select
              class="form-control"
              name="type"
              :class="{ valid: !$v.files.type.$invalid, invalid: $v.files.type.$invalid }"
              v-model="$v.files.type.$model"
              id="files-type"
              data-cy="type"
            >
              <option value="EO" v-bind:label="$t('hackatonappApp.FileType.EO')">EO</option>
              <option value="DINING_ROOM" v-bind:label="$t('hackatonappApp.FileType.DINING_ROOM')">DINING_ROOM</option>
              <option value="DORMITIRY_ROOM" v-bind:label="$t('hackatonappApp.FileType.DORMITIRY_ROOM')">DORMITIRY_ROOM</option>
              <option value="LECTURE_ROOM" v-bind:label="$t('hackatonappApp.FileType.LECTURE_ROOM')">LECTURE_ROOM</option>
              <option value="ASSEMBLY_HALL" v-bind:label="$t('hackatonappApp.FileType.ASSEMBLY_HALL')">ASSEMBLY_HALL</option>
              <option value="OTHER" v-bind:label="$t('hackatonappApp.FileType.OTHER')">OTHER</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.files.description')" for="files-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="files-description"
              data-cy="description"
              :class="{ valid: !$v.files.description.$invalid, invalid: $v.files.description.$invalid }"
              v-model="$v.files.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.files.university')" for="files-university">University</label>
            <select class="form-control" id="files-university" data-cy="university" name="university" v-model="files.university">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="files.university && universityOption.id === files.university.id ? files.university : universityOption"
                v-for="universityOption in universities"
                :key="universityOption.id"
              >
                {{ universityOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.files.profile')" for="files-profile">Profile</label>
            <select class="form-control" id="files-profile" data-cy="profile" name="profile" v-model="files.profile">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="files.profile && profileOption.id === files.profile.id ? files.profile : profileOption"
                v-for="profileOption in profiles"
                :key="profileOption.id"
              >
                {{ profileOption.id }}
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
            :disabled="$v.files.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./files-update.component.ts"></script>

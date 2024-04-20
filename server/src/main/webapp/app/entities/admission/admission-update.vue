<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="hackatonappApp.admission.home.createOrEditLabel"
          data-cy="AdmissionCreateUpdateHeading"
          v-text="$t('hackatonappApp.admission.home.createOrEditLabel')"
        >
          Create or edit a Admission
        </h2>
        <div>
          <div class="form-group" v-if="admission.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="admission.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.admission.university')" for="admission-university"
              >University</label
            >
            <select class="form-control" id="admission-university" data-cy="university" name="university" v-model="admission.university">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  admission.university && universityOption.id === admission.university.id ? admission.university : universityOption
                "
                v-for="universityOption in universities"
                :key="universityOption.id"
              >
                {{ universityOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.admission.direction')" for="admission-direction">Direction</label>
            <select class="form-control" id="admission-direction" data-cy="direction" name="direction" v-model="admission.direction">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="admission.direction && directionOption.id === admission.direction.id ? admission.direction : directionOption"
                v-for="directionOption in directions"
                :key="directionOption.id"
              >
                {{ directionOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.admission.profile')" for="admission-profile">Profile</label>
            <select class="form-control" id="admission-profile" data-cy="profile" name="profile" v-model="admission.profile">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="admission.profile && profileOption.id === admission.profile.id ? admission.profile : profileOption"
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
            :disabled="$v.admission.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./admission-update.component.ts"></script>

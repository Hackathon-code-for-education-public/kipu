<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="hackatonappApp.userToUniversity.home.createOrEditLabel"
          data-cy="UserToUniversityCreateUpdateHeading"
          v-text="$t('hackatonappApp.userToUniversity.home.createOrEditLabel')"
        >
          Create or edit a UserToUniversity
        </h2>
        <div>
          <div class="form-group" v-if="userToUniversity.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="userToUniversity.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('hackatonappApp.userToUniversity.scienceDegree')"
              for="user-to-university-scienceDegree"
              >Science Degree</label
            >
            <select
              class="form-control"
              name="scienceDegree"
              :class="{ valid: !$v.userToUniversity.scienceDegree.$invalid, invalid: $v.userToUniversity.scienceDegree.$invalid }"
              v-model="$v.userToUniversity.scienceDegree.$model"
              id="user-to-university-scienceDegree"
              data-cy="scienceDegree"
            >
              <option value="BACHELOR" v-bind:label="$t('hackatonappApp.ScienceDegree.BACHELOR')">BACHELOR</option>
              <option value="MAGISTER" v-bind:label="$t('hackatonappApp.ScienceDegree.MAGISTER')">MAGISTER</option>
              <option value="ASPIRANT" v-bind:label="$t('hackatonappApp.ScienceDegree.ASPIRANT')">ASPIRANT</option>
              <option value="ABITURIENT" v-bind:label="$t('hackatonappApp.ScienceDegree.ABITURIENT')">ABITURIENT</option>
              <option value="UNDERGRADUADE" v-bind:label="$t('hackatonappApp.ScienceDegree.UNDERGRADUADE')">UNDERGRADUADE</option>
              <option value="COLLEGE" v-bind:label="$t('hackatonappApp.ScienceDegree.COLLEGE')">COLLEGE</option>
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
            :disabled="$v.userToUniversity.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./user-to-university-update.component.ts"></script>

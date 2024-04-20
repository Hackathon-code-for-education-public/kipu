<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="hackatonappApp.direction.home.createOrEditLabel"
          data-cy="DirectionCreateUpdateHeading"
          v-text="$t('hackatonappApp.direction.home.createOrEditLabel')"
        >
          Create or edit a Direction
        </h2>
        <div>
          <div class="form-group" v-if="direction.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="direction.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.direction.name')" for="direction-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="direction-name"
              data-cy="name"
              :class="{ valid: !$v.direction.name.$invalid, invalid: $v.direction.name.$invalid }"
              v-model="$v.direction.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.direction.university')" for="direction-university"
              >University</label
            >
            <select class="form-control" id="direction-university" data-cy="university" name="university" v-model="direction.university">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  direction.university && universityOption.id === direction.university.id ? direction.university : universityOption
                "
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
            :disabled="$v.direction.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./direction-update.component.ts"></script>

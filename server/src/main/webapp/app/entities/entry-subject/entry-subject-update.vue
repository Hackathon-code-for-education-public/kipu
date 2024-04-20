<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="hackatonappApp.entrySubject.home.createOrEditLabel"
          data-cy="EntrySubjectCreateUpdateHeading"
          v-text="$t('hackatonappApp.entrySubject.home.createOrEditLabel')"
        >
          Create or edit a EntrySubject
        </h2>
        <div>
          <div class="form-group" v-if="entrySubject.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="entrySubject.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.entrySubject.name')" for="entry-subject-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="entry-subject-name"
              data-cy="name"
              :class="{ valid: !$v.entrySubject.name.$invalid, invalid: $v.entrySubject.name.$invalid }"
              v-model="$v.entrySubject.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.entrySubject.minimumScore')" for="entry-subject-minimumScore"
              >Minimum Score</label
            >
            <input
              type="number"
              class="form-control"
              name="minimumScore"
              id="entry-subject-minimumScore"
              data-cy="minimumScore"
              :class="{ valid: !$v.entrySubject.minimumScore.$invalid, invalid: $v.entrySubject.minimumScore.$invalid }"
              v-model.number="$v.entrySubject.minimumScore.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.entrySubject.examDate')" for="entry-subject-examDate"
              >Exam Date</label
            >
            <div class="d-flex">
              <input
                id="entry-subject-examDate"
                data-cy="examDate"
                type="datetime-local"
                class="form-control"
                name="examDate"
                :class="{ valid: !$v.entrySubject.examDate.$invalid, invalid: $v.entrySubject.examDate.$invalid }"
                :value="convertDateTimeFromServer($v.entrySubject.examDate.$model)"
                @change="updateInstantField('examDate', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.entrySubject.direction')" for="entry-subject-direction"
              >Direction</label
            >
            <select class="form-control" id="entry-subject-direction" data-cy="direction" name="direction" v-model="entrySubject.direction">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  entrySubject.direction && directionOption.id === entrySubject.direction.id ? entrySubject.direction : directionOption
                "
                v-for="directionOption in directions"
                :key="directionOption.id"
              >
                {{ directionOption.id }}
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
            :disabled="$v.entrySubject.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./entry-subject-update.component.ts"></script>

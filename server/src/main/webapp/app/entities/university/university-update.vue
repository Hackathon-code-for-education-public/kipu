<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="hackatonappApp.university.home.createOrEditLabel"
          data-cy="UniversityCreateUpdateHeading"
          v-text="$t('hackatonappApp.university.home.createOrEditLabel')"
        >
          Create or edit a University
        </h2>
        <div>
          <div class="form-group" v-if="university.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="university.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.university.name')" for="university-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="university-name"
              data-cy="name"
              :class="{ valid: !$v.university.name.$invalid, invalid: $v.university.name.$invalid }"
              v-model="$v.university.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.university.desciption')" for="university-desciption"
              >Desciption</label
            >
            <input
              type="text"
              class="form-control"
              name="desciption"
              id="university-desciption"
              data-cy="desciption"
              :class="{ valid: !$v.university.desciption.$invalid, invalid: $v.university.desciption.$invalid }"
              v-model="$v.university.desciption.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.university.address')" for="university-address">Address</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="university-address"
              data-cy="address"
              :class="{ valid: !$v.university.address.$invalid, invalid: $v.university.address.$invalid }"
              v-model="$v.university.address.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.university.phoneNumber')" for="university-phoneNumber"
              >Phone Number</label
            >
            <input
              type="text"
              class="form-control"
              name="phoneNumber"
              id="university-phoneNumber"
              data-cy="phoneNumber"
              :class="{ valid: !$v.university.phoneNumber.$invalid, invalid: $v.university.phoneNumber.$invalid }"
              v-model="$v.university.phoneNumber.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.university.email')" for="university-email">Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="university-email"
              data-cy="email"
              :class="{ valid: !$v.university.email.$invalid, invalid: $v.university.email.$invalid }"
              v-model="$v.university.email.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.university.site')" for="university-site">Site</label>
            <input
              type="text"
              class="form-control"
              name="site"
              id="university-site"
              data-cy="site"
              :class="{ valid: !$v.university.site.$invalid, invalid: $v.university.site.$invalid }"
              v-model="$v.university.site.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.university.phoneNumbers')" for="university-phoneNumbers"
              >Phone Numbers</label
            >
            <input
              type="text"
              class="form-control"
              name="phoneNumbers"
              id="university-phoneNumbers"
              data-cy="phoneNumbers"
              :class="{ valid: !$v.university.phoneNumbers.$invalid, invalid: $v.university.phoneNumbers.$invalid }"
              v-model="$v.university.phoneNumbers.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.university.emails')" for="university-emails">Emails</label>
            <input
              type="text"
              class="form-control"
              name="emails"
              id="university-emails"
              data-cy="emails"
              :class="{ valid: !$v.university.emails.$invalid, invalid: $v.university.emails.$invalid }"
              v-model="$v.university.emails.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.university.schedule')" for="university-schedule">Schedule</label>
            <input
              type="text"
              class="form-control"
              name="schedule"
              id="university-schedule"
              data-cy="schedule"
              :class="{ valid: !$v.university.schedule.$invalid, invalid: $v.university.schedule.$invalid }"
              v-model="$v.university.schedule.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.university.responsiblePerson')" for="university-responsiblePerson"
              >Responsible Person</label
            >
            <input
              type="text"
              class="form-control"
              name="responsiblePerson"
              id="university-responsiblePerson"
              data-cy="responsiblePerson"
              :class="{ valid: !$v.university.responsiblePerson.$invalid, invalid: $v.university.responsiblePerson.$invalid }"
              v-model="$v.university.responsiblePerson.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.university.id')" for="university-id">Id</label>
            <select class="form-control" id="university-id" data-cy="id" name="id" v-model="university.id">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="university.id && userToUniversityOption.id === university.id.id ? university.id : userToUniversityOption"
                v-for="userToUniversityOption in ids"
                :key="userToUniversityOption.id"
              >
                {{ userToUniversityOption.id }}
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
            :disabled="$v.university.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./university-update.component.ts"></script>

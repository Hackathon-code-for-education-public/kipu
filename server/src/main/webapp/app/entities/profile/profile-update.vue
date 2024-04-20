<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="hackatonappApp.profile.home.createOrEditLabel"
          data-cy="ProfileCreateUpdateHeading"
          v-text="$t('hackatonappApp.profile.home.createOrEditLabel')"
        >
          Create or edit a Profile
        </h2>
        <div>
          <div class="form-group" v-if="profile.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="profile.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.profile.fullName')" for="profile-fullName">Full Name</label>
            <input
              type="text"
              class="form-control"
              name="fullName"
              id="profile-fullName"
              data-cy="fullName"
              :class="{ valid: !$v.profile.fullName.$invalid, invalid: $v.profile.fullName.$invalid }"
              v-model="$v.profile.fullName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.profile.phoneNumber')" for="profile-phoneNumber"
              >Phone Number</label
            >
            <input
              type="text"
              class="form-control"
              name="phoneNumber"
              id="profile-phoneNumber"
              data-cy="phoneNumber"
              :class="{ valid: !$v.profile.phoneNumber.$invalid, invalid: $v.profile.phoneNumber.$invalid }"
              v-model="$v.profile.phoneNumber.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.profile.description')" for="profile-description"
              >Description</label
            >
            <input
              type="text"
              class="form-control"
              name="description"
              id="profile-description"
              data-cy="description"
              :class="{ valid: !$v.profile.description.$invalid, invalid: $v.profile.description.$invalid }"
              v-model="$v.profile.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.profile.rating')" for="profile-rating">Rating</label>
            <input
              type="number"
              class="form-control"
              name="rating"
              id="profile-rating"
              data-cy="rating"
              :class="{ valid: !$v.profile.rating.$invalid, invalid: $v.profile.rating.$invalid }"
              v-model.number="$v.profile.rating.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.profile.userId')" for="profile-userId">User Id</label>
            <select class="form-control" id="profile-userId" data-cy="userId" name="userId" v-model="profile.userId">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="profile.userId && userToUniversityOption.id === profile.userId.id ? profile.userId : userToUniversityOption"
                v-for="userToUniversityOption in userIds"
                :key="userToUniversityOption.id"
              >
                {{ userToUniversityOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.profile.avatar')" for="profile-avatar">Avatar</label>
            <select class="form-control" id="profile-avatar" data-cy="avatar" name="avatar" v-model="profile.avatar">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="profile.avatar && imageOption.id === profile.avatar.id ? profile.avatar : imageOption"
                v-for="imageOption in avatars"
                :key="imageOption.id"
              >
                {{ imageOption.id }}
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
            :disabled="$v.profile.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./profile-update.component.ts"></script>

<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="hackatonappApp.comment.home.createOrEditLabel"
          data-cy="CommentCreateUpdateHeading"
          v-text="$t('hackatonappApp.comment.home.createOrEditLabel')"
        >
          Create or edit a Comment
        </h2>
        <div>
          <div class="form-group" v-if="comment.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="comment.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.comment.content')" for="comment-content">Content</label>
            <input
              type="text"
              class="form-control"
              name="content"
              id="comment-content"
              data-cy="content"
              :class="{ valid: !$v.comment.content.$invalid, invalid: $v.comment.content.$invalid }"
              v-model="$v.comment.content.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.comment.rate')" for="comment-rate">Rate</label>
            <input
              type="number"
              class="form-control"
              name="rate"
              id="comment-rate"
              data-cy="rate"
              :class="{ valid: !$v.comment.rate.$invalid, invalid: $v.comment.rate.$invalid }"
              v-model.number="$v.comment.rate.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.comment.user')" for="comment-user">User</label>
            <select class="form-control" id="comment-user" data-cy="user" name="user" v-model="comment.user">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="comment.user && profileOption.id === comment.user.id ? comment.user : profileOption"
                v-for="profileOption in profiles"
                :key="profileOption.id"
              >
                {{ profileOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.comment.university')" for="comment-university">University</label>
            <select class="form-control" id="comment-university" data-cy="university" name="university" v-model="comment.university">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="comment.university && universityOption.id === comment.university.id ? comment.university : universityOption"
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
            :disabled="$v.comment.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./comment-update.component.ts"></script>

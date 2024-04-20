<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="hackatonappApp.image.home.createOrEditLabel"
          data-cy="ImageCreateUpdateHeading"
          v-text="$t('hackatonappApp.image.home.createOrEditLabel')"
        >
          Create or edit a Image
        </h2>
        <div>
          <div class="form-group" v-if="image.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="image.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.image.imageURL')" for="image-imageURL">Image URL</label>
            <input
              type="text"
              class="form-control"
              name="imageURL"
              id="image-imageURL"
              data-cy="imageURL"
              :class="{ valid: !$v.image.imageURL.$invalid, invalid: $v.image.imageURL.$invalid }"
              v-model="$v.image.imageURL.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.image.date')" for="image-date">Date</label>
            <div class="d-flex">
              <input
                id="image-date"
                data-cy="date"
                type="datetime-local"
                class="form-control"
                name="date"
                :class="{ valid: !$v.image.date.$invalid, invalid: $v.image.date.$invalid }"
                :value="convertDateTimeFromServer($v.image.date.$model)"
                @change="updateInstantField('date', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.image.comment')" for="image-comment">Comment</label>
            <select class="form-control" id="image-comment" data-cy="comment" name="comment" v-model="image.comment">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="image.comment && commentOption.id === image.comment.id ? image.comment : commentOption"
                v-for="commentOption in comments"
                :key="commentOption.id"
              >
                {{ commentOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.image.university')" for="image-university">University</label>
            <select class="form-control" id="image-university" data-cy="university" name="university" v-model="image.university">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="image.university && universityOption.id === image.university.id ? image.university : universityOption"
                v-for="universityOption in universities"
                :key="universityOption.id"
              >
                {{ universityOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hackatonappApp.image.product')" for="image-product">Product</label>
            <select class="form-control" id="image-product" data-cy="product" name="product" v-model="image.product">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="image.product && productOption.id === image.product.id ? image.product : productOption"
                v-for="productOption in products"
                :key="productOption.id"
              >
                {{ productOption.id }}
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
            :disabled="$v.image.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./image-update.component.ts"></script>

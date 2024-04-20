<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="image">
        <h2 class="jh-entity-heading" data-cy="imageDetailsHeading">
          <span v-text="$t('hackatonappApp.image.detail.title')">Image</span> {{ image.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hackatonappApp.image.imageURL')">Image URL</span>
          </dt>
          <dd>
            <span>{{ image.imageURL }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.image.date')">Date</span>
          </dt>
          <dd>
            <span v-if="image.date">{{ $d(Date.parse(image.date), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.image.comment')">Comment</span>
          </dt>
          <dd>
            <div v-if="image.comment">
              <router-link :to="{ name: 'CommentView', params: { commentId: image.comment.id } }">{{ image.comment.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.image.university')">University</span>
          </dt>
          <dd>
            <div v-if="image.university">
              <router-link :to="{ name: 'UniversityView', params: { universityId: image.university.id } }">{{
                image.university.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.image.product')">Product</span>
          </dt>
          <dd>
            <div v-if="image.product">
              <router-link :to="{ name: 'ProductView', params: { productId: image.product.id } }">{{ image.product.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="image.id" :to="{ name: 'ImageEdit', params: { imageId: image.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./image-details.component.ts"></script>

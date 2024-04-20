<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="comment">
        <h2 class="jh-entity-heading" data-cy="commentDetailsHeading">
          <span v-text="$t('hackatonappApp.comment.detail.title')">Comment</span> {{ comment.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hackatonappApp.comment.content')">Content</span>
          </dt>
          <dd>
            <span>{{ comment.content }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.comment.rate')">Rate</span>
          </dt>
          <dd>
            <span>{{ comment.rate }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.comment.user')">User</span>
          </dt>
          <dd>
            <div v-if="comment.user">
              <router-link :to="{ name: 'ProfileView', params: { profileId: comment.user.id } }">{{ comment.user.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.comment.university')">University</span>
          </dt>
          <dd>
            <div v-if="comment.university">
              <router-link :to="{ name: 'UniversityView', params: { universityId: comment.university.id } }">{{
                comment.university.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="comment.id" :to="{ name: 'CommentEdit', params: { commentId: comment.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./comment-details.component.ts"></script>

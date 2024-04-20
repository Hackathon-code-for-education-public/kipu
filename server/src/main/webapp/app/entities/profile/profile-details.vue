<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="profile">
        <h2 class="jh-entity-heading" data-cy="profileDetailsHeading">
          <span v-text="$t('hackatonappApp.profile.detail.title')">Profile</span> {{ profile.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hackatonappApp.profile.fullName')">Full Name</span>
          </dt>
          <dd>
            <span>{{ profile.fullName }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.profile.phoneNumber')">Phone Number</span>
          </dt>
          <dd>
            <span>{{ profile.phoneNumber }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.profile.description')">Description</span>
          </dt>
          <dd>
            <span>{{ profile.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.profile.rating')">Rating</span>
          </dt>
          <dd>
            <span>{{ profile.rating }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.profile.userId')">User Id</span>
          </dt>
          <dd>
            <div v-if="profile.userId">
              <router-link :to="{ name: 'UserToUniversityView', params: { userToUniversityId: profile.userId.id } }">{{
                profile.userId.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.profile.avatar')">Avatar</span>
          </dt>
          <dd>
            <div v-if="profile.avatar">
              <router-link :to="{ name: 'ImageView', params: { imageId: profile.avatar.id } }">{{ profile.avatar.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="profile.id" :to="{ name: 'ProfileEdit', params: { profileId: profile.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./profile-details.component.ts"></script>

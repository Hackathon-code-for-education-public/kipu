<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="userToUniversity">
        <h2 class="jh-entity-heading" data-cy="userToUniversityDetailsHeading">
          <span v-text="$t('hackatonappApp.userToUniversity.detail.title')">UserToUniversity</span> {{ userToUniversity.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hackatonappApp.userToUniversity.scienceDegree')">Science Degree</span>
          </dt>
          <dd>
            <span v-text="$t('hackatonappApp.ScienceDegree.' + userToUniversity.scienceDegree)">{{ userToUniversity.scienceDegree }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="userToUniversity.id"
          :to="{ name: 'UserToUniversityEdit', params: { userToUniversityId: userToUniversity.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./user-to-university-details.component.ts"></script>

<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="admission">
        <h2 class="jh-entity-heading" data-cy="admissionDetailsHeading">
          <span v-text="$t('hackatonappApp.admission.detail.title')">Admission</span> {{ admission.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hackatonappApp.admission.university')">University</span>
          </dt>
          <dd>
            <div v-if="admission.university">
              <router-link :to="{ name: 'UniversityView', params: { universityId: admission.university.id } }">{{
                admission.university.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.admission.direction')">Direction</span>
          </dt>
          <dd>
            <div v-if="admission.direction">
              <router-link :to="{ name: 'DirectionView', params: { directionId: admission.direction.id } }">{{
                admission.direction.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.admission.profile')">Profile</span>
          </dt>
          <dd>
            <div v-if="admission.profile">
              <router-link :to="{ name: 'ProfileView', params: { profileId: admission.profile.id } }">{{
                admission.profile.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="admission.id"
          :to="{ name: 'AdmissionEdit', params: { admissionId: admission.id } }"
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

<script lang="ts" src="./admission-details.component.ts"></script>

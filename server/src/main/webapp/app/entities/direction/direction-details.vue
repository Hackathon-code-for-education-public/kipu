<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="direction">
        <h2 class="jh-entity-heading" data-cy="directionDetailsHeading">
          <span v-text="$t('hackatonappApp.direction.detail.title')">Direction</span> {{ direction.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hackatonappApp.direction.name')">Name</span>
          </dt>
          <dd>
            <span>{{ direction.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.direction.university')">University</span>
          </dt>
          <dd>
            <div v-if="direction.university">
              <router-link :to="{ name: 'UniversityView', params: { universityId: direction.university.id } }">{{
                direction.university.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="direction.id"
          :to="{ name: 'DirectionEdit', params: { directionId: direction.id } }"
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

<script lang="ts" src="./direction-details.component.ts"></script>

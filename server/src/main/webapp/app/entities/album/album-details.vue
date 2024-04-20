<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="album">
        <h2 class="jh-entity-heading" data-cy="albumDetailsHeading">
          <span v-text="$t('hackatonappApp.album.detail.title')">Album</span> {{ album.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hackatonappApp.album.name')">Name</span>
          </dt>
          <dd>
            <span>{{ album.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.album.university')">University</span>
          </dt>
          <dd>
            <div v-if="album.university">
              <router-link :to="{ name: 'UniversityView', params: { universityId: album.university.id } }">{{
                album.university.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="album.id" :to="{ name: 'AlbumEdit', params: { albumId: album.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./album-details.component.ts"></script>

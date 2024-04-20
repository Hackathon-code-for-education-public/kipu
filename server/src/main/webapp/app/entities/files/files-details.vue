<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="files">
        <h2 class="jh-entity-heading" data-cy="filesDetailsHeading">
          <span v-text="$t('hackatonappApp.files.detail.title')">Files</span> {{ files.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hackatonappApp.files.url')">Url</span>
          </dt>
          <dd>
            <span>{{ files.url }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.files.type')">Type</span>
          </dt>
          <dd>
            <span v-text="$t('hackatonappApp.FileType.' + files.type)">{{ files.type }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.files.description')">Description</span>
          </dt>
          <dd>
            <span>{{ files.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.files.university')">University</span>
          </dt>
          <dd>
            <div v-if="files.university">
              <router-link :to="{ name: 'UniversityView', params: { universityId: files.university.id } }">{{
                files.university.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.files.profile')">Profile</span>
          </dt>
          <dd>
            <div v-if="files.profile">
              <router-link :to="{ name: 'ProfileView', params: { profileId: files.profile.id } }">{{ files.profile.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="files.id" :to="{ name: 'FilesEdit', params: { filesId: files.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./files-details.component.ts"></script>

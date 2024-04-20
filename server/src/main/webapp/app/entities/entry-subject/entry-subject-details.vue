<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="entrySubject">
        <h2 class="jh-entity-heading" data-cy="entrySubjectDetailsHeading">
          <span v-text="$t('hackatonappApp.entrySubject.detail.title')">EntrySubject</span> {{ entrySubject.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hackatonappApp.entrySubject.name')">Name</span>
          </dt>
          <dd>
            <span>{{ entrySubject.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.entrySubject.minimumScore')">Minimum Score</span>
          </dt>
          <dd>
            <span>{{ entrySubject.minimumScore }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.entrySubject.examDate')">Exam Date</span>
          </dt>
          <dd>
            <span v-if="entrySubject.examDate">{{ $d(Date.parse(entrySubject.examDate), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.entrySubject.direction')">Direction</span>
          </dt>
          <dd>
            <div v-if="entrySubject.direction">
              <router-link :to="{ name: 'DirectionView', params: { directionId: entrySubject.direction.id } }">{{
                entrySubject.direction.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="entrySubject.id"
          :to="{ name: 'EntrySubjectEdit', params: { entrySubjectId: entrySubject.id } }"
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

<script lang="ts" src="./entry-subject-details.component.ts"></script>

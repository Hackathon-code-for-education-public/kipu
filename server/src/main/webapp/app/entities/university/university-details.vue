<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="university">
        <h2 class="jh-entity-heading" data-cy="universityDetailsHeading">
          <span v-text="$t('hackatonappApp.university.detail.title')">University</span> {{ university.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hackatonappApp.university.name')">Name</span>
          </dt>
          <dd>
            <span>{{ university.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.university.desciption')">Desciption</span>
          </dt>
          <dd>
            <span>{{ university.desciption }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.university.address')">Address</span>
          </dt>
          <dd>
            <span>{{ university.address }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.university.phoneNumber')">Phone Number</span>
          </dt>
          <dd>
            <span>{{ university.phoneNumber }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.university.email')">Email</span>
          </dt>
          <dd>
            <span>{{ university.email }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.university.site')">Site</span>
          </dt>
          <dd>
            <span>{{ university.site }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.university.phoneNumbers')">Phone Numbers</span>
          </dt>
          <dd>
            <span>{{ university.phoneNumbers }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.university.emails')">Emails</span>
          </dt>
          <dd>
            <span>{{ university.emails }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.university.schedule')">Schedule</span>
          </dt>
          <dd>
            <span>{{ university.schedule }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.university.responsiblePerson')">Responsible Person</span>
          </dt>
          <dd>
            <span>{{ university.responsiblePerson }}</span>
          </dd>
          <dt>
            <span v-text="$t('hackatonappApp.university.id')">Id</span>
          </dt>
          <dd>
            <div v-if="university.id">
              <router-link :to="{ name: 'UserToUniversityView', params: { userToUniversityId: university.id.id } }">{{
                university.id.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="university.id"
          :to="{ name: 'UniversityEdit', params: { universityId: university.id } }"
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

<script lang="ts" src="./university-details.component.ts"></script>

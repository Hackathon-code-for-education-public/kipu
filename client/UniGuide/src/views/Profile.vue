<template>
  <TheHeader />

  <div class="profile">
    <div class="profile__wrap">
      <el-avatar class="profile__avatar" :size="120" src="/avatar.jpeg" />

      <h2 class="profile__title">{{ user.login }}</h2>

      <div class="profile__info">
        <p class="profile__role">абитуриент</p>
        <p>{{ user.email }}</p>
      </div>

      <div class="profile__confirm">
        <img class="profile__confirm-img" src="/profile_1.svg" />

        <div>
          <h2 class="profile__title">Подтверди статус студента</h2>
          <p class="profile__desc">Для подтверждения статуса студента загрузите скан-копию студенческого билета </p>

          <el-button color="#626aef" size="large">Загрузить фото</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import axios from "@/utils/axios"
import {useCookies} from "vue3-cookies";

export default {
  name: "Profile",
  components: {TheHeader},
  data () {
    return {
      user: null
    }
  },
  async created () {
    const { cookies } = useCookies()

    const { data } = await axios.get('/account', {
      headers: {
        'Authorization': cookies.get('token')
      }
    })

    if (data) {
      this.user = data
    }
  }
}
</script>

<style lang="scss">
.profile {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 40px;

  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__info {
    display: flex;
    gap: 20px;
  }

  &__title {
    margin-top: 20px;
    margin-bottom: 20px;

    font-weight: 700;
  }

  &__confirm {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 1280px) {
      flex-direction: row;
      gap: 60px;
    }
  }

  &__avatar {
  }
}
</style>

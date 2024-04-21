<template>
  <div class="header">
    <div class="header__logo">
      <router-link to="/">
        <img class="header__logo-img" src="/logo.svg" />
      </router-link>
    </div>

    <div v-if="isMobile" class="header__right">
      <el-button color="#626aef" :dark="true" size="default">Меню</el-button>
    </div>

    <div v-if="isDesktop" class="header__right">
      <el-menu
        ellipsis
        class="el-menu-popper-demo"
        mode="horizontal"
        :popper-offset="16"
        style="max-width: 600px; background: transparent"
      >
        <el-menu-item index="1">ВУЗы</el-menu-item>
        <el-sub-menu index="2">
          <template #title>Специальности</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="3" :popper-offset="8">
          <template #title>Специальности</template>
          <el-menu-item index="3-1">item one</el-menu-item>
          <el-menu-item index="3-2">item two</el-menu-item>
          <el-menu-item index="3-3">item three</el-menu-item>
        </el-sub-menu>
        <el-menu-item v-if="!isLogin" @click="handleLoginClick" index="4">Вход</el-menu-item>
        <el-menu-item v-else index="4"><router-link to="/profile">Профиль</router-link></el-menu-item>
        <el-menu-item @click="handleLoginClick" index="5"><router-link to="/panorama">Панорама</router-link></el-menu-item>
      </el-menu>
    </div>

    <el-dialog
      v-if="isLoginModalView"
      v-model="isLoginModalView"
      title="Вход"
      width="400"
      align-center
      style="border-radius: 20px; height: 370px; padding: 20px"
    >
      <div style="display: flex; flex-direction: column; align-items: center">
        <el-input size="large" v-model="email" style="width: 240px; margin-bottom: 15px; margin-top: 20px;" placeholder="Имя" />
        <el-input size="large" v-model="password" style="width: 240px; margin-bottom: 40px;" placeholder="Пароль" />
      </div>

      <div class="dialog-footer">
<!--        <el-button size="default" @click="isLoginModalView = false">Отменить</el-button>-->
        <el-button @click="handleLogin" size="default" type="primary">
          Войти
        </el-button>
      </div>

      <div class="notregistered">
        <p>Ещё не зарегистрированы? <span style="cursor: pointer" @click="handleRegClick">Зарегистрироваться</span></p>
      </div>
    </el-dialog>

    <el-dialog
      v-if="isRegModalView"
      v-model="isRegModalView"
      title="Регистрация"
      width="400"
      align-center
      style="border-radius: 20px; height: 390px; padding: 30px"
    >
      <div style="display: flex; flex-direction: column; align-items: center">
        <el-input size="large" v-model="email" style="width: 240px; margin-bottom: 15px; margin-top: 20px;" placeholder="Эл. почта" />
        <el-input size="large" v-model="name" style="width: 240px; margin-bottom: 15px" placeholder="Имя" />
        <el-input size="large" v-model="password" style="width: 240px; margin-bottom: 15px;" placeholder="Пароль" />
      </div>

      <div class="dialog-footer">
        <el-button @click="handleRegistration" size="default" type="primary">
          Зарегистрироваться
        </el-button>
      </div>

      <div style="height: 100%" class="notregistered">
        <p>Уже зарегистрированы? <span style="cursor: pointer" @click="handleLoginClick">Войти</span></p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from '@/utils/axios'
import { useCookies } from "vue3-cookies";

export default {
  name: "TheHeader",
  data () {
    return {
      isMobile: window.innerWidth < 1280,
      isDesktop: window.innerWidth >= 1280,
      isLoginModalView: false,
      isRegModalView: false,
      name: '',
      email: '',
      password: '',
      isLogin: false
    }
  },
  setup () {
    const { cookies } = useCookies();
    return { cookies }
  },
  mounted () {
    const { cookies } = useCookies()
    const token = cookies.get('token')

    this.isLogin = !!token
  },
  methods: {
    handleLoginClick() {
      this.isLoginModalView = true
      this.isRegModalView = false
    },
    handleRegClick() {
      this.isLoginModalView = false
      this.isRegModalView = true
    },
    async handleLogin() {
      const loginData = {
        username: this.email,
        rememberMe: true,
        password: this.password
      }
      const { data } = await axios.post('/authenticate', loginData)
      this.cookies.set("token", `Bearer ${data.id_token}`);
      this.isLogin = true
      this.isLoginModalView = false
    },
    async handleRegistration() {
      const regData = {
        login: this.name,
        email: this.email,
        password: this.password,
        activated: true
      }
      await axios.post('/register', regData)
      this.handleLoginClick()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  @media (min-width: 1280px) {
    width: 1280px;

    &__logo {
      &-img {
        width: 150% !important;
      }
    }
  }
}

.notregistered {
  padding: 10px;
  display: flex;
  justify-content: center;
  text-align: center;

  margin-left: auto;
  margin-right: auto;

  background-color: #ffffd5;
  border-radius: 20px;
  max-width: 300px;
  height: 70px;

  span {
    font-weight: 800;
  }
}

.dialog-footer {
  display: flex;
  justify-content: center;

  margin-bottom: 20px;
}
</style>

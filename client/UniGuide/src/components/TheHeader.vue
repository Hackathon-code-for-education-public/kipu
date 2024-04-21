<template>
  <div class="header">
    <div class="header__logo">
      <router-link to="/">
        <img class="header__logo-img" src="/logo.png" />
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
        <el-menu-item @click="handleLoginClick" index="4">Вход</el-menu-item>
        <el-menu-item @click="handleLoginClick" index="5"><router-link to="/panorama">Панорама</router-link></el-menu-item>
        <el-menu-item index="6">Orders</el-menu-item>
      </el-menu>
    </div>

    <el-dialog
      v-if="isLoginModalView"
      v-model="isLoginModalView"
      title="Вход"
      width="400"
      align-center
      style="border-radius: 20px; height: 370px"
    >
      <div style="display: flex; flex-direction: column; align-items: center">
        <el-input size="large" v-model="email" style="width: 240px; margin-bottom: 15px; margin-top: 20px;" placeholder="Эл. почта" />
        <el-input size="large" v-model="password" style="width: 240px; margin-bottom: 40px;" placeholder="Пароль" />
      </div>

      <div class="dialog-footer">
        <el-button size="default" @click="isLoginModalView = false">Отменить</el-button>
        <el-button size="default" type="primary" @click="isLoginModalView = false">
          Войти
        </el-button>
      </div>

      <div class="notregistered">
        <p>Ещё не зарегистрированы? <span @click="isLoginModalView">Зарегистрироваться</span></p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data () {
    return {
      isMobile: window.innerWidth < 1280,
      isDesktop: window.innerWidth >= 1280,
      isLoginModalView: false,
      isRegModalView: false,
      email: '',
      password: ''
    }
  },
  methods: {
    handleLoginClick() {
      this.isLoginModalView = true
    },
    handleRegClick() {
      this.isRegModalView = true
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

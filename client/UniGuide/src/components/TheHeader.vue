<template>
  <div class="header">
    <div class="header__logo">
      <img class="header__logo-img" src="/logo.png" />
    </div>

    <div class="header__right">
      <el-button color="#626aef" :dark="true" size="default">Меню</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader"
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

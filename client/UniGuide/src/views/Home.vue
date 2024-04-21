<template>
  <TheHeader />

  <div class="hero">
    <img class="hero__img" src="/hero.png" />

    <div>
      <h2 class="hero__title">Поступать легче - с нами!</h2>
      <p class="hero__desc">Будь смелее, строй свое будущее с уверенностью! </p>
      <el-button style="gap: 10px" color="#626aef" size="large">
        Узнать подробнее
        <el-icon>
          <ArrowRightBold />
        </el-icon>
      </el-button>
    </div>
  </div>

  <div class="registration">
    <h2 class="registration__title">Регистрация на портале</h2>

    <div class="registration__wrap">
      <p class="registration__desc">Зарегистрируйся для доступа к полному функционалу. </p>
    </div>

    <el-button style="gap: 10px" color="#626aef" size="large">
      Узнать подробнее
      <el-icon>
        <ArrowRightBold />
      </el-icon>
    </el-button>

    <hr class="dashed" />

    <img class="registration__img" src="/meditation.png" />
  </div>

  <h2 style="margin-bottom: 20px;">Список вузов</h2>
  <div class="list">
    <UniversityCard />
    <UniversityCard />
    <UniversityCard />
    <UniversityCard />

    <div v-if="isMobile" class="button--primary" color="#626aef" size="large">
      Полный список всех вузов с возможностью сортировки
      <el-icon>
        <ArrowRightBold />
      </el-icon>
    </div>
  </div>

  <h2 style="margin-top: 50px; margin-bottom: 20px;">Список Специальностей</h2>
  <div style="padding-bottom: 100px" class="list">
    <UniversityCard />
    <UniversityCard />
    <UniversityCard />
    <UniversityCard />

    <div v-if="isMobile" class="button--primary" color="#626aef" size="large">
      Полный список всех специальностей с возможностью сортировки
      <el-icon>
        <ArrowRightBold />
      </el-icon>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import {ArrowRightBold} from "@element-plus/icons-vue";
import UniversityCard from "@/components/UniversityCard.vue";

export default {
  name: "Home",
  components: {UniversityCard, ArrowRightBold, TheHeader},
  data () {
    return {
      isMobile: window.innerWidth < 1280,
      isDesktop: window.innerWidth >= 1280
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-weight: 700;
  font-size: 20px;
}

.list {

  @media (min-width: 1280px) {
    display: flex;
    gap: 20px;
  }
}

.registration {
  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: #EADEFA;
  border: 1px solid #0998FF;
  border-radius: 20px;
  padding: 20px;

  margin-top: 26px;
  margin-bottom: 76px;

  &__wrap {
    background-color: #EFEAFD;
    border: 0.5px solid #0998FF;
    border-radius: 20px;
    padding: 20px;

    margin-top: 20px;
    margin-bottom: 50px;
  }

  &__title {
    font-weight: 700;
  }

  &__desc {
    font-weight: 600;
  }

  @media (min-width: 1280px) {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 400px;

    margin-left: auto;

    margin-right: auto;
  }
}

.hero {
  display: flex;
  flex-direction: column;

  &__title {
    font-weight: 900;
  }

  &__desc {
    color: #616161;
    font-weight: 600;
  }

  &__img {
    margin-top: 44px;
  }
  
  @media (min-width: 1280px) {
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-around;

    gap: 15px;

    width: 100%;

    &__title {
      font-size: 32px;
      max-width: 600px;

      margin-bottom: 20px;
    }

    &__desc {
      font-size: 22px;
      max-width: 400px;

      margin-bottom: 30px;
    }

    &__img {
      width: 40%;
    }
  }
}

.dashed {
  border-top: 1px dashed;
  border-bottom: none;

  margin-top: 30px;
  margin-bottom: 30px;
}
</style>

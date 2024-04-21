<template>
  <div v-if="university" class="card" style="max-width: 300px; max-height: 600px;">
    <img class="card__img"  :src="`http://localhost:8080/resources/uploads/${university.images[0].imageURL}`" />
    <div v-if="university" class="card__title">
      {{ university.name }}
    </div>
    <p class="card__desc">{{  }}</p>
<!--    <p v-for="o in 4" :key="o" class="card__desc">{{ 'Стоимость обучения ' + o + ' Р'}}</p>-->
    <button v-if="uId" class="button" type="text"><router-link :to="`/university/${uId}`">Узнать подробнее <el-icon><ArrowRightBold /></el-icon></router-link></button>
  </div>
</template>

<script>

import {ArrowRightBold} from "@element-plus/icons-vue";
import {useRoute} from "vue-router";
import axios from "@/utils/axios";

export default {
  name: "UniversityCard",
  components: {ArrowRightBold},
  data () {
    return {
      university: null
    }
  },
  props: {
    uId: {
      type: Number,
      required: false
    }
  },
  async mounted () {
    const route = useRoute()
    const { data } = await axios.get(`/universities/${this.uId}`)
    this.university = data
    console.log(`http://localhost:8080/resources/uploads/${this.university.images[0].imageURL}`)
  },
}
</script>

<style lang="scss">
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: #EADEFA;
  border-radius: 20px;
  border: 1px solid #0998FF;
  padding: 20px;

  margin-bottom: 20px;

  &__title {
    font-weight: 700;
    font-size: 28px;

    margin-top: 10px;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 0;
  }

  &__img {
    border-radius: 25px;
  }
}

.button {
  margin-top: 10px;
  justify-content: flex-start;
  color: black;
  text-align: start;
  font-weight: 700;
  background: transparent;
  border: none;
  padding-left: 0;
  align-items: center;
  display: flex;
}
</style>

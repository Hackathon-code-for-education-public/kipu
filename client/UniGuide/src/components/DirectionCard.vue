<template>
  <div v-if="direction" class="card" style="max-width: 300px; max-height: 600px;">
    <div v-if="direction" class="card__title">
      {{ direction.name }}
    </div>

    <div v-if="direction.disciplines.length">
      <p v-for="o in direction.disciplines" :key="o" class="card__desc">{{ o.name + ' (мин. балл ' + o.minimumScore + ')'}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "DirectionCard",
  props: {
    direction: {
      type: Object,
      required: true
    }
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

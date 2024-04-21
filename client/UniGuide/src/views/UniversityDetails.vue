<template>
  <TheHeader />
  <div class="container" style="margin-top: 50px; margin-bottom: 50px; margin-left: 0; margin-right: 0;">
    <h1>Крымский-инженерно педагогический университет имени Февзи Якубова</h1>
  </div>

  <div class="container px-4 text-right">
    <div class="row gx-5">
      <div class="col">
        <div class="p-5 ">
          <button class="btn" style="background-color: #7956FF; color:aliceblue"><b>Хочу поступить сюда</b><i class="fa-duotone fa-address-book"></i> </button>
        </div>
        <div class="p-5">
          <button class="btn" style="background-color: #7956FF; color:aliceblue"><b>Навигация по ВУЗу</b><i class="fa-duotone fa-address-book"></i> </button>
        </div>
        <div class="p-3">
          <h2>Описание</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.
            Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..
          </p>

          <h2>Формат обучения</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.
            Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..
          </p>

          <h2>Внеучебная деятельность КИПУ имени Февзи Якубова</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.
            Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..
          </p>

          <h2>Документы</h2>
          <p class="p-4">
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 15px; margin-right: 10px;" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z"/></svg>
            <a href="https://kipu-rc.ru/downloads/2023/prikaz/817.pdf">Положение о зачислении №1</a>
          </p>

          <h2>Контактные данные</h2>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </div>
      <div class="col">
        <div class="p-3">
          <img src = "https://cdn-crimea-news.com/img/20190902/94ba314f52d8940e7317afb2f298e2fc.jpg"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";

export default {
  name: "UniversityDetails",
  components: {TheHeader}
}
</script>

<style scoped lang="scss">

</style>

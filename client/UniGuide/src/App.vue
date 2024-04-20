<template>
  <View360 v-if="projection" showControlBar projectionType="cubemap" ref="viewerRef" class="sds is-16by9" :hotspot="{'zoom':false}"
           :projection="projection">
    <div class="view360-hotspots">
      <div class="view360-hotspot"
           v-for="(hotspot, i: number) in hotspots"
           :data-yaw="hotspot.yaw"
           :data-pitch="hotspot.pitch">
        <div
          @click="handleHotspotClick(hotspot)"
          class="hotspot__item">{{ hotspot.text }}</div>
      </div>
    </div>
  </View360>
</template>
<script>
import { View360, EquirectProjection } from '@egjs/vue3-view360'
import data from "@/utils/data";

export default {
  data () {
    return {
      name: data,
      currentProjectionIndex: 1,
      projection: null
    }
  },
  methods: {
    handleHotspotClick (h) {
      this.currentProjectionIndex = h.foreignProjectionIndex + 1
      this.projection = new EquirectProjection({
        src: [
          `/${this.currentProjectionIndex}.jpeg`
        ]
      })
      console.log(this.currentProjectionIndex)
    }
  },
  computed: {
    hotspots () {
      console.log(data[this.currentProjectionIndex - 1])
      return data[this.currentProjectionIndex - 1]
    }
  },
  created () {
    this.projection = new EquirectProjection({
      src: [
        `/${this.currentProjectionIndex}.jpeg`
      ]
    })
  },
  components: {
    View360
  }
}
</script>

<style lang="scss">
//@import "@egjs/view360/css/view360.css";
.sds {
  canvas {
    width: 1280px;
    height: 720px;
  }
}

</style>


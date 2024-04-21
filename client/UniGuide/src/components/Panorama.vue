<template>
  <TheHeader style="margin-bottom: 40px;" />
  <View360
    showControlBar
    projectionType="cubemap"
    ref="viewerRef"
    class="is-16by9"
    canvasClass="projection__canvas"
    :hotspot="{'zoom':false}"
    :projection="projection"
  >
    <div
      class="view360-hotspots"
    >
      <div
        class="view360-hotspot"
        v-for="(hotspot) in hotspots"
        :data-yaw="hotspot.yaw"
        :data-pitch="hotspot.pitch">
        <div
          @click="handleHotspotClick(hotspot)"
          class="hotspot__item"
        >
          {{ hotspot.text }}
        </div>
      </div>
    </div>
  </View360>
</template>
<script>
import { View360, EquirectProjection } from '@egjs/vue3-view360'
import data from "@/utils/data";
import TheHeader from "@/components/TheHeader.vue";

export default {
  data () {
    return {
      currentProjectionIndex: 1,
      projection: null
    }
  },
  methods: {
    async handleHotspotClick (h) {
      this.currentProjectionIndex = h.foreignProjectionIndex + 1
      this.projection = new EquirectProjection({
        src: [
          `/pano${this.currentProjectionIndex}.jpg`
        ]
      })
    }
  },
  computed: {
    hotspots () {
      return data[this.currentProjectionIndex - 1]
    }
  },
  created () {
    this.projection = new EquirectProjection({
      src: [
        `/pano${this.currentProjectionIndex}.jpg`
      ]
    })
  },
  components: {
    TheHeader,
    View360
  }
}
</script>

<style lang="scss">
.projection__canvas {
  width: 1280px;
  height: 720px;

  border-radius: 25px;
}

</style>


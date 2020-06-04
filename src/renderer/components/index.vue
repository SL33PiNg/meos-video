<template>
  <div id="map" />
</template>

<script>
import mapboxgl from 'mapbox-gl'
export default {
  data() {
    return {
      latlng: '',
      accessToken:
        'pk.eyJ1Ijoibm9vazM5MjAiLCJhIjoiY2s5OTlycGRkMDEzbjNlbWt0eWJpYWo3OCJ9.STeeCOccG7hVQ8aiktTRFw',
      map: {}
    }
  },
  mounted() {
    this.createMap()
  },
  methods: {
    createMap() {
      mapboxgl.accessToken = this.accessToken
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [100.5923, 13.9255],
        zoom: 10,
        
      })
      this.map.touchPitch.disable()
      this.map.dragRotate.disable()
    }
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
.mapboxgl-control-container {
  display: none;
}
.mapbox-improve-map {
  display: none;
}
</style>

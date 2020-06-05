<template>
  <v-app>
    <v-content>
      <div id="app">
        <router-view />
      </div>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'FuApp'
}
</script>

<style>
.mapboxgl-control-container {
  display: none;
}

::-webkit-scrollbar {
  display: none;
}
</style>

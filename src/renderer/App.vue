<template>
  <v-app>
    <v-app-bar app>
      <v-btn @click="toggleLayout">
        test
      </v-btn>
      <v-btn @click="toggleLayout">
        test
      </v-btn>
      <v-checkbox label="layout" />
      {{ layout }}
    </v-app-bar>
    <v-content>
      <div id="app">
        <router-view />
      </div>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'FuApp',
  computed: {
    layout() {
      return this.$store.state.Layout.panel
    }
  },
  mounted() {
    console.log(this.$store)
  },
  methods: {
    test() {
      console.log('aaa')
    },
    toggleLayout() {
      console.log('ttt')
      this.$store.dispatch('Layout/toggle_layout')
    }
  }
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

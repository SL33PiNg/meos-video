<template>
  <v-app>
    <v-content>
      <div id="app">
        <router-view />
      </div>
    </v-content>
    <v-footer padless absolute app>
      <v-card height="100px" width="100%" color="grey">
        <v-row justify="center">
          status
        </v-row>
      </v-card>
    </v-footer>
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

<template>
  <v-app dark>
    <v-app-bar
      flat
      fixed
      app
      color="origGreen"
      class="rounded-b-lg"
    >
      <v-toolbar-title color="back">
        Face2Deco
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container class="mx-2">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.v-application {
  background-color: '#FFFFF0';
}
</style>

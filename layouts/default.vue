<template>
  <v-app dark>
    <v-app-bar
      flat
      fixed
      app
      color="#66D3A7"
      class="rounded-b-lg"
    >
      <v-toolbar-title>Digital Hack Day 2021 team Apple</v-toolbar-title>
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

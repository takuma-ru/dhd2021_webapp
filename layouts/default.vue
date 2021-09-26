<template>
  <v-app dark>
    <v-navigation-drawer
      fixed
      dark
      app
      mini-variant
      color="#405B84"
      class="rounded-r-lg"
    >
      <v-list
        nav
        dense
        class="my-1"
      >
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div style="margin-left: 56px">
      <v-app-bar
        flat
        color="transparent"
      >
        <v-toolbar-title color="back">
          <strong>
            {{ path == '/'? '映っている人一覧' : '情報を編集する' }}
          </strong>
        </v-toolbar-title>
        <v-spacer />
      </v-app-bar>
      <v-main>
        <Nuxt />
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  computed: {
    path() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.v-application {
  background-color: #fffdfb;
}
</style>

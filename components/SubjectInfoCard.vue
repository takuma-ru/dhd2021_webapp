<template>
  <div>
    <v-card
      outlined
      class="rounded-lg"
    >
      <v-row>
        <div id="img">
          <img>
        </div>
        <v-col>
          <v-card-title>
            {{ name }}
          </v-card-title>
          <v-card-subtitle>
            asd
          </v-card-subtitle>
          <v-card-text>
            asd
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
      required: true
    },
    github: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>

<style>
img {
  height: 100%;
  width: auto;
}
</style>

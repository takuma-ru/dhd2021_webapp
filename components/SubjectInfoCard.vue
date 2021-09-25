<template>
  <div>
    <v-card
      outlined
      class="rounded-lg"
    >
      <v-card-title>
        {{ name }}
      </v-card-title>
      <v-card-subtitle>
        asd
      </v-card-subtitle>
      <v-card-text>
        asd
      </v-card-text>
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
    }
  }
}
</script>

<style>

</style>

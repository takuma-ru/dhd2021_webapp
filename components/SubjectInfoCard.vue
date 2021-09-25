<template>
  <div>
    <v-card
      color="#66C9D3"
      class="rounded-lg mx-4 my-4"
    >
      <v-col cols="6">
        <v-img
          :src="faceImgPath"
          class="rounded-lg"
        />
      </v-col>
      <v-col cols="6">
        <v-card-title>
          {{ name }}
        </v-card-title>
        <v-card-text>
          <strong>情報</strong><br>
          <ul>
            <li>Github： {{ github }}</li>
            <li>twitter： @{{ twitter }}</li>
            <li>novelty：
              <ul>
                <li v-for="(item, i) in novelty" :key="i">
                  {{ item }}
                </li>
              </ul>
            </li>
          </ul>
        </v-card-text>
      </v-col>
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
    },
    twitter: {
      type: String,
      default: '',
      required: false
    },
    novelty: {
      type: Array,
      default: null,
      required: false
    },
    faceImgPath: {
      type: String,
      default: '',
      required: true
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

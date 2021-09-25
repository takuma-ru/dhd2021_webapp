<template>
  <div>
    <v-card
      color="#66C9D3"
      dark
      flat
      class="rounded-lg mx-4 my-4"
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title
            class="text-h5"
            v-text="name"
          />

          <v-card-text>
            <strong>情報</strong><br>
            <ul>
              <li>Github： {{ github }}</li>
              <li>twitter： @{{ twitter }}</li>
              <li>
                novelty：
                <ul>
                  <li v-for="(item, i) in novelty" :key="i">
                    {{ item }}
                  </li>
                </ul>
              </li>
            </ul>
          </v-card-text>
        </div>
        <v-avatar
          class="ma-3"
          size="125"
          tile
        >
          <v-img
            class="rounded-lg"
            :src="faceImgPath"
          />
        </v-avatar>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faceImgPath: undefined
    }
  },

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
    }
  },

  mounted() {
    this.$store.dispatch('getFileUrl', this.name).then(res => {
      this.faceImgPath = res
      console.log(res)
    })
  }
}
</script>

<style>
img {
  height: 100%;
  width: auto;
}
</style>

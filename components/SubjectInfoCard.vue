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
              <li>novelty sticker： {{ novelty_sticker }}</li>
              <li>novelty batch： {{ novelty_batch }}</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn
              depressed
              class="rounded-lg"
              @click="$router.push(`post/${name}`)"
            >
              編集する
            </v-btn>
          </v-card-actions>
        </div>
        <v-avatar
          class="ma-3"
          size="100"
          tile
        >
          <v-img
            class="rounded-lg"
            :src="faceImgPath"
            style="background-color: gray"
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
    novelty_sticker: {
      type: Array,
      default: null,
      required: false
    },
    novelty_batch: {
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

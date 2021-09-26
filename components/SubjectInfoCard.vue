<template>
  <div>
    <v-card
      v-if="isActive"
      color="#6692D3"
      dark
      flat
      class="rounded-lg mx-4 my-4"
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title
            class="text-h4"
            v-text="name"
          />

          <v-card-text class="text">
            <strong>情報</strong><br>
            <ul style="list-style: none">
              <li>
                <table class="my-2">
                  <thead>
                    <tr>
                      <th colspan="2">Github： {{ github }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>会社</td>
                      <td>{{ githubRes ? (githubRes.posts.company ? githubRes.posts.company : '記載なし' ) : '情報なし' }}</td>
                    </tr>
                    <tr>
                      <td>スター</td>
                      <td>{{  githubRes ? githubRes.starCount : '情報なし' }}</td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>twitter： @{{ twitter }}</li>
              <li>novelty sticker： {{ novelty_sticker }}</li>
              <li>novelty batch： {{ novelty_batch }}</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn
              depressed
              color="white"
              class="rounded-lg"
              style="color: #6692D3"
              @click="$router.push(`post/${name}`)"
            >
              編集する
            </v-btn>
          </v-card-actions>
        </div>
        <v-avatar
          class="ma-3"
          size="150"
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
import Vue from 'vue'
import SetInterval from '@/plugins/SetInterval/index.js'

Vue.use(SetInterval)

export default {
  data() {
    return {
      faceImgPath: undefined,
      githubRes: undefined
    }
  },

  props: {
    isActive: {
      type: Boolean,
    },
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
      default: null,
      required: false
    },
    novelty_batch: {
      default: null,
      required: false
    }
  },

  created() {
    this.$setInterval(() => {
      const date = new Date()
      console.log(date)
      this.$store.dispatch('getFileUrl', this.name).then(res => {
        this.faceImgPath = res
        console.log(res)
      })
    }, 5000)
  },

  mounted() {
    this.$store.dispatch('getFileUrl', this.name).then(res => {
      this.faceImgPath = res
      console.log(res)
    })
    this.$store.dispatch('getGithubProfile', this.github).then(res => {
      this.githubRes = res
      console.log(res)
    })
  },

}
</script>

<style>
img {
  height: 100%;
  width: auto;
}

.text {
  font-size: 1rem;
}

li {
  margin-top: 1vh;
}

th,td {
    border: solid 1px;  /* 枠線指定 */
    padding: 10px;      /* 余白指定 */
}

table {
    border-collapse:  collapse; /* セルの線を重ねる */
}
</style>

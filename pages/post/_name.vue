<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col xcols="12">
        <v-card-text>
          <v-text-field
            ref="name"
            v-model="name"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
            readonly
            label="ニックネーム※今回は編集できません"
            prepend-icon="mdi-account"
            placeholder="あなたの通称を入力してください"
            required
          />
          <v-text-field
            ref="github"
            v-model="github"
            prepend-icon="mdi-github"
            label="Githubネーム"
            placeholder="Githubのユーザーネームを入力してください"
          />
          <v-text-field
            ref="twitter"
            v-model="twitter"
            prepend-icon="mdi-twitter"
            label="Twitterアカウント"
            placeholder="Twitterのアカウント名を入力してください"
          />
          <v-select
            v-model="novelty_sticker"
            :items="novelty_sticker_items"
            item-text="name"
            item-value="name"
            prepend-icon="mdi-checkbox-blank"
            label="ステッカー"
            placeholder="付けたいステッカーを選択してください"
            :multiple="false"
          >
            <template v-slot:item="{ item }">
                <v-chip :color="item.color">
                  {{ item.name }}
                </v-chip>
                <v-spacer />
                <span class="ml-3">
                  {{ item.description }}
                </span>
                <v-spacer />
                <v-list-item-avatar
                  min-width="100px"
                  min-height="100px"
                  tile
                  right
                  class="rounded-lg"
                >
                  <v-img
                    :src="`/${item.imgPath}`"
                    width="100%"
                    height="100%"
                  ></v-img>
                </v-list-item-avatar>
            </template>
          </v-select>
          <v-select
            v-model="novelty_badge"
            :items="novelty_badge_items"
            item-text="name"
            item-value="name"
            prepend-icon="mdi-brightness-1"
            label="バッチ"
            placeholder="付けたいバッチを選択してください"
            :multiple="false"
          >
            <template v-slot:item="{ item }">
                <v-chip :color="item.color">
                  {{ item.name }}
                </v-chip>
                <v-spacer />
                <span class="ml-3">
                  {{ item.description }}
                </span>
                <v-spacer />
                <v-list-item-avatar
                  min-width="100px"
                  min-height="100px"
                  tile
                  right
                  class="rounded-lg"
                >
                  <v-img
                    :src="`/${item.imgPath}`"
                    width="100%"
                    height="100%"
                  ></v-img>
                </v-list-item-avatar>
            </template>
          </v-select>
        </v-card-text>

        <v-divider class="mt-12" />

        <v-card-actions>
          <v-btn
            to="/"
            text
          >
            戻る
          </v-btn>
          <v-spacer />
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn
            color="primary"
            text
            @click="submit"
          >
            保存する
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import swipemodal from 'nekoo_vue_swipemodal'
import 'nekoo_vue_swipemodal/dist/swipemodal.css'

export default {
  components: {
    swipemodal
  },

  data: () => ({
    name: null,
    github: null,
    twitter: null,
    novelty_sticker: [],
    novelty_badge: [],
    novelty_sticker_items: [
      { name: 'ライゾマティクス',　color: '#A1DDEE', description: 'ライゾマティクスのバッチ', imgPath: 's_rhizoma_200.png' },
      { name: '梶ラボ',　color: '', description: '梶ラボのバッチ', imgPath: 's_kaji_200.png' },
      { name: 'チームラボ',　color: '#D8CD1C', description: 'チームラボのバッチ', imgPath: 's_teamlab_200.png' },
    ],
    novelty_badge_items: [
      { name: 'HackDays',　color: '#31B5C1', description: 'Digital Hack Day 2021のステッカー', imgPath: 'b_hackday_100.png' },
      { name: 'cookpad',　color: '#DE6F27', description: 'cookpadのステッカー', imgPath: 'b_cookpad_100.png' },
      { name: 'github',　color: '#', description: 'githubのステッカー', imgPath: 'b_octcat_100.png' },
    ],
    tag_sheet: false,
    formHasErrors: false,
    errorMessages: [],
    specificData: {},
    parmsName: null,
  }),

  computed: {
    soracomData() {
      return this.$store.state.soracomData
    },
    form () {
      return {
        name: this.name
      }
    }
  },

  async mounted() {
    // this.$store.dispatch('getGithubProfileImg', 'takuma-ru')

    this.parmsName = this.$route.params.name
    console.log(this.parmsName)
    const messageRef = this.$fire.database.ref(`user/${this.parmsName}`)
    try {
      const snapshot = await messageRef.once('value')
      this.specificData = snapshot.val()
      this.name = this.specificData.name
      this.github = this.specificData.github
      this.twitter = this.specificData.twitter
      this.novelty_sticker = this.specificData.novelty_sticker
      this.novelty_badge = this.specificData.novelty_badge
    } catch (e) {
      this.specificData = {}
      console.error(e)
      return
    }
  },

  watch: {
    name () {
      this.errorMessages = ''
    }
  },

  methods: {
    resetForm () {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset()
      })
    },
    submit () {
      this.formHasErrors = false

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) {
          this.formHasErrors = true
        } else {
          if(this.name != this.specificData.name) {
            this.$store.dispatch('setUserProfile', {
              oldName: this.specificData.name,
              name: this.name,
              github: this.github,
              twitter: this.twitter,
              novelty_sticker: this.novelty_sticker,
              novelty_badge: this.novelty_badge
            })
          }
          this.$store.dispatch('setUserProfile', {
            name: this.name,
            github: this.github,
            twitter: this.twitter,
            novelty_sticker: this.novelty_sticker,
            novelty_badge: this.novelty_badge
          })
        }

        this.$refs[f].validate(true)
      })
    },
  }
}
</script>

<style>

</style>

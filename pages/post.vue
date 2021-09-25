<template>
  <v-container>
    <h3>情報を編集する</h3>
    <v-row justify="center" align="center">
      <v-col
        cols="12"
      >
        <v-card-text>
          <v-text-field
            ref="name"
            v-model="name"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
            label="ニックネーム"
            placeholder="あなたの通称を入力してください"
            required
          />
          <v-text-field
            ref="github"
            v-model="github"
            label="Githubネーム"
            placeholder="Githubのユーザーネームを入力してください"
            required
          />
          <v-text-field
            ref="twitter"
            v-model="twitter"
            label="Twitterアカウント"
            placeholder="Twitterのアカウント名を入力してください"
            required
          />
          <v-card-text class="py-6 black--text">
            <v-icon class="mr-4">mdi-tag</v-icon>
            <v-chip
              v-for="item in novelty"
              :key="item"
              dark
              class="mx-1 my-1"
            >
              {{ novelty[item].name }}
            </v-chip>

            <v-btn
              v-model="tag_sheet"
              class="mx-1"
              rounded
              depressed
              color="grey darken-2"
              dark
              @click="tag_sheet = true"
            >
              <v-icon >mdi-plus</v-icon>
              <span>ノベルティを追加</span>
            </v-btn>
            <swipemodal
              v-model="tag_sheet"
              height="auto"
              width="800px"
              max-width="100vw"
              radius="10px"
            >
              <v-sheet
                class="px-4 py-4 rounded-t-lg"
              >
                <v-card-title class="font-weight-black">
                  ノベルティの追加
                </v-card-title>

                <v-divider class="mx-2" />

                <v-card-text>
                  <v-list rounded dense>
                    <v-list-item-group
                      v-model="novelty"
                      multiple
                      active-class=""
                    >
                      <v-list-item
                        v-for="(item, i) in novelty_sticker_items"
                        :key="i"
                        light
                        :color="item.color"
                      >
                        <template #default="{ active }">
                          <v-list-item-action>
                            <v-checkbox
                              :input-value="active"
                              :color="item.color"
                              :ripple="false"
                            />
                          </v-list-item-action>
                          <v-list-item-title>
                            <v-chip
                              dark
                              small
                              :color="item.color"
                              class="mr-4"
                            >
                              {{ item.name }}
                            </v-chip>
                            {{ item.description }}
                          </v-list-item-title>
                        </template>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card-text>

                <v-divider class="mx-2 mb-4" />

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    dark
                    depressed
                    color="MY_blue"
                    @click="tag_sheet = false"
                  >
                    <v-icon class="mr-1">mdi-check</v-icon>OK
                  </v-btn>
                </v-card-actions>
              </v-sheet>
            </swipemodal>
          </v-card-text>
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
    novelty: [],
    novelty_sticker_items: [
      { name: 'mapbox', description: 'map' },
      { name: 'mapbox', description: 'map' },
      { name: 'mapbox', description: 'map' },
      { name: 'mapbox', description: 'map' }
    ],
    tag_sheet: false,
    formHasErrors: false
  }),

  computed: {
    form () {
      return {
        name: this.name
      }
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
        }

        this.$refs[f].validate(true)
      })
    }
  }
}
</script>

<style>

</style>

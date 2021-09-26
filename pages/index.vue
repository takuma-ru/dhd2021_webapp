<template>
  <v-container fluid>
    <h3>映っている人一覧</h3>
    <v-row justify="center" align="center">
      <v-img
        max-height="600px"
        max-width="800px"
        style="background-color: gray"
        class="rounded-lg"
        :src="imgPath"
      ></v-img>
    </v-row>
    <v-row justify="center" align="center">
      <SubjectInfoCard
        v-for="(item, i) in soracomData"
        :key="i"
        :isActive="true"
        :name="item.name"
        :github="item.github"
        :twitter="item.twitter"
        :novelty_sticker="item.novelty_sticker"
        :novelty_batch="item.novelty_batch"
      />
    </v-row>
  </v-container>
</template>

<script>
import SubjectInfoCard from '../components/SubjectInfoCard.vue'
import Vue from 'vue'
import SetInterval from '@/plugins/SetInterval/index.js'

Vue.use(SetInterval)

export default {
  components: { SubjectInfoCard },
  data () {
    return {
      imgPath: undefined
    }
  },

  computed: {
    soracomData() {
      return this.$store.state.soracomData
    }
  },

  created() {
    this.$setInterval(() => {
      const date = new Date()
      console.log(date)
      this.$store.dispatch('getOverallImgUrl').then(res => {
      this.imgPath = res
      console.log(res)
      })
    }, 5000)
  },

  mounted() {
    this.$store.dispatch('getAllUserProfile')
    this.$store.dispatch('getOverallImgUrl').then(res => {
      this.imgPath = res
      console.log(res)
    })
  },

  methods: {
  }
}
</script>

<style>

</style>

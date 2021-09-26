<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-img
          max-height="600px"
          max-width="800px"
          style="background-color: gray"
          class="rounded-lg"
          :src="imgPath"
        ></v-img>
      </v-col>
      <v-col
        cols="12"
        md="6"
        style="max-height: 80vh"
        class="overflow-y-auto cardGroup"
      >
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
      </v-col>
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
.cardGroup::-webkit-scrollbar {
  width: 0px;
}
</style>

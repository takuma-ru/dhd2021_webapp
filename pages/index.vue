<template>
  <v-container>
    <h3>映っている人一覧</h3>
    <v-row justify="center" align="center">
      <SubjectInfoCard
        v-for="(item, i) in soracomData"
        :key="i"
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
export default {
  components: { SubjectInfoCard },
  data () {
    return {

    }
  },

  computed: {
    soracomData() {
      return this.$store.state.soracomData
    }
  },

  mounted() {
    this.$store.dispatch('getAllUserProfile')
    this.$store.dispatch('getFileUrl', 'ryoki')
  },

  methods :{
  }
}
</script>

<style>

</style>

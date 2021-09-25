<template>
  <v-container>
    <v-row justify="center" align="center">
      <SubjectInfoCard
        v-for="(item, i) in soracomData"
        :key="i"
        :name="'ryoki'"
        :github="item.github"
        :twitter="item.twitter"
        :novelty="item.novelty"
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
    this.$store.dispatch('getUserProfile')
    this.$store.dispatch('getFileUrl', 'ryoki')
  },

  methods :{
  }
}
</script>

<style>

</style>

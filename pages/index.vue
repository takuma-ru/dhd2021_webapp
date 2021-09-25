<template>
  <v-row>
    <v-col>
      <SubjectInfoCard name="nickname" />
    </v-col>
  </v-row>
</template>

<script>
import SubjectInfoCard from '../components/SubjectInfoCard.vue'
export default {
  components: { SubjectInfoCard },
  data () {
    return {
      msg: 'nickname'
    }
  }
}
</script>

<style>

</style>

<template>
  <v-row style="">
    <v-col>
      <SubjectInfoCard
        v-for="(item, i) in soracom"
        :key="i"
        :name="item.nickname"
        :face-img-path="item.faceImgPath"
        :github="item.github"
        :twitter="item.twitter"
        :novelty="item.novelty"
      />
    </v-col>
  </v-row>
</template>

<script>
import SubjectInfoCard from '../components/SubjectInfoCard.vue'
export default {
  components: { SubjectInfoCard },
  data () {
    return {
      soracom: [
        {
          name: 'name',
          github: 'asd',
          twitter: 'asd',
          novelty: ['asd', 'fgh'],
          faceImgPath: 'https://picsum.photos/id/11/500/300'
        },
        {
          name: 'name',
          github: 'asd',
          twitter: 'asd',
          novelty: ['asd', 'fgh'],
          faceImgPath: 'https://picsum.photos/id/11/500/300'
        },
        {
          name: 'name',
          github: 'asd',
          twitter: 'asd',
          novelty: ['asd', 'fgh'],
          faceImgPath: 'https://picsum.photos/id/11/500/300'
        }
      ]
    }
  }
}
</script>

<style>

</style>

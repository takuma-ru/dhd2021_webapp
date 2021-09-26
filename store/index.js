export const state = () => ({
  soracomData: {},
  specificData: {}
})

export const mutations = {
  updateSoracomData (state, status) {
    state.soracomData = status
  },
  updateSpecificData (state, status) {
    state.specificData = status
  },
}

export const actions = {
  async getGithubProfileImg({ $axios }, githubName) {
    const response_github = await this.$axios.$get(`https://github-contributions-api.deno.dev/${githubName}.svg`)
    // クロスオリジンエラー！！
    console.log(response_github)
  },


  async delOldUserProfile({}, oldName) {
    const messageRef = this.$fire.database.ref(`user/${oldName}`)
    try {
      await messageRef.remove()
    } catch(e) {
      console.error(e)
      return
    }
  },

  async setUserProfile({ dispatch }, { oldName, name, github, twitter, novelty_sticker, novelty_batch }) {
    const messageRef = this.$fire.database.ref(`user/${name}`)
    try {
      await messageRef.set({
        name: name,
        github: github,
        twitter: twitter,
        novelty_sticker: novelty_sticker, //Array
        novelty_batch: novelty_batch, //Array
      }).then(() => {
        dispatch('delOldUserProfile', oldName)
      })
    } catch (e) {
      console.error(e)
      return
    }
    console.log('Success.')
    this.$router.push(`/`)
  },

  async getAllUserProfile({ commit }) {
    const messageRef = this.$fire.database.ref('user')
    try {
      const snapshot = await messageRef.once('value')
      commit('updateSoracomData', snapshot.val())
      console.log(snapshot.val())
    } catch (e) {
      console.error(e)
      return
    }
  },
  async getSpecificUserProfile({ commit }, name){
    const messageRef = this.$fire.database.ref(`user${name}`)
    try {
      const snapshot = await messageRef.once('value')
      commit('updateSpecificData', snapshot.val())
      console.log(snapshot.val())
    } catch (e) {
      console.error(e)
      return
    }
  },

  async getFileUrl({}, name) {
    const storageRef = this.$fire.storage.ref('img').child(`${name}.png`)
    try {
      const url = await storageRef.getDownloadURL()
      return url
    } catch (e) {
      console.error(e.message)
    }
  },

  async getOverallImgUrl({}) {
    const storageRef = this.$fire.storage.ref('img').child(`full.png`)
    try {
      const url = await storageRef.getDownloadURL()
      return url
    } catch (e) {
      console.error(e.message)
    }
  },

  async getGithubProfile({}, github) {
    // 取得先のurl
    const url_git = `https://api.github.com/users/${github}`
    const url_repo = `https://api.github.com/users/${github}/repos`
    // リクエスト（Get）
    const response_github = await this.$axios.$get(url_git)
    const response_repo = await this.$axios.$get(url_repo)

    var count = 0

    for (let index = 0; index < response_repo.length; index++) {
      count += response_repo[index].stargazers_count
    }
    // 配列で返ってくるのでJSONにして返却
    return {
      posts: response_github,
      repos : response_repo,
      starCount : count,
      svgImg: `https://github-contributions-api.deno.dev/${github}.svg`
    }
  }
}
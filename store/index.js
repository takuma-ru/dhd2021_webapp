export const state = () => ({
  soracomData: {}
})

export const mutations = {
  updateSoracomData (state, status) {
    state.soracomData = status
  },
}

export const actions = {
  async setUserProfile({  }, { name, github, twitter, novelty }) {
    const messageRef = this.$fire.database.ref(`user/${name}`)
    try {
      await messageRef.set({
        name: name,
        github: github,
        twitter: twitter,
        novelty: novelty, //Array
      })
    } catch (e) {
      console.error(e)
      return
    }
    console.log('Success.')
  },

  async getUserProfile({ commit }) {
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

  async getFileUrl({}, name) {
    const storageRef = this.$fire.storage.ref('img/user').child(`${name}.png`)
    try {
      const url = await storageRef.getDownloadURL()
      return url
    } catch (e) {
      console.error(e.message)
    }
  },

  async getGithubProfile({ $axios }, github) {
    // 取得先のurl
    const url_git = `https://api.github.com/users/hama1185`
    const url_repo = "https://api.github.com/users/hama1185/repos"
    // リクエスト（Get）
    const response_github = await $axios.$get(url_git)
    const response_repo = await $axios.$get(url_repo)

    var count = 0

    for (let index = 0; index < response_repo.length; index++) {
      count += response_repo[index].stargazers_count
    }
    // 配列で返ってくるのでJSONにして返却
    return {
      posts: response_github,
      repos : response_repo,
      star_count : count
    }
  }
}
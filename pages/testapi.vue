<script>
export default {
  async asyncData({ $axios }) {
    // 取得先のurl
    const url_git = "https://api.github.com/users/hama1185";
    const url_repo = "https://api.github.com/users/hama1185/repos";
    // リクエスト（Get）
    const response_github = await $axios.$get(url_git);
    const response_repo = await $axios.$get(url_repo);

    var count = 0;

    for (let index = 0; index < response_repo.length; index++) {
      count += response_repo[index].stargazers_count;
    }
    // 配列で返ってくるのでJSONにして返却
    return {
      posts: response_github,
      repos: response_repo,
      star_count: count,
    };
  },
};
</script>

<template>
  <div>
    <p>{{ posts.login }}</p>
    <p>{{ posts.company }}</p>
    <p>{{ posts.bio }}</p>

    <img src =https://github-contributions-api.deno.dev/hama1185.svg>
    <p>{{ star_count }}</p>
  </div>
</template>
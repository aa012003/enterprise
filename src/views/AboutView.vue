<template>
  <div class="about">
    <h1>
      {{ data.cell }}
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    }
  },
  mounted() {
    console.log(import.meta.env.VITE_TEXT)
    const url = import.meta.env.VITE_PATH
    this.$http.get(url).then((res) => {
      console.log(res)
      this.data = res.data.results[0]
    })
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

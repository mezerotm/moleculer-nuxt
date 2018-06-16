<template>
  <div>
    <p>{{ api }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      api: 'sample'
    }
  },
  async mounted () {
    this.api = await this.$axios.$get('/')
    console.log(this.api)
  }
}
</script>

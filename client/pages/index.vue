<template>
  <div>
    <p>{{ api.message }}</p>
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

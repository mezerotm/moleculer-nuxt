<template lang="pug">
    .section
        database-put
        database-post
        database-find

</template>
<script>
import databasePut from '@/components/databasePut'
import databasePost from '@/components/databasePost'
import databaseFind from '@/components/databaseFind'

export default {
  components: {
    databasePut,
    databasePost,
    databaseFind
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
</style>

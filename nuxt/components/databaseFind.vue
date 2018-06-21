<template lang="pug">

        b-collapse.card(:open="false")
            .card-header(slot="trigger" slot-scope="props")
                .card-header-title Database Find
                .card-header-icon
                    b-icon(:icon="props.open ? 'menu-down' : 'menu-up'")
            .card-content

                b-field(label="Table Name" horizontal)
                    b-input(
                    v-model="model"
                    placeholder="users"
                    min="1"
                    max="64"
                    )

                b-field(
                label="Query"
                :type="parsedQuery ? '' : 'is-danger'"
                :message="parsedQuery ? '' : 'Invalid JSON'"
                horizontal
                )
                    b-input(
                    v-model="query"
                    type="textarea"
                    rows=3
                    placeholder=`{\n\t"_id": "5b272b82bf03be309893d357"\n}`
                    )

                button.button.is-primary.is-pulled-right(@click="submitForm") Submit

                b-field.is-clearfix

                b-field.control#result(label="Result" horizontal)
                    b-input(
                    v-model="result"
                    type="textarea"
                    rows=5
                    placeholder="200 OK"
                    readonly
                    )
</template>

<script>
export default {
  data () {
    return {
      model: null,
      query: null,
      result: ''
    }
  },
  methods: {
    async submitForm () {
      const resultTextArea = document.querySelector('#result')
      resultTextArea.classList.add('is-loading')

      const result = await this.$axios.$post('/database/find', {
        model: this.model,
        query: this.parsedQuery
      })

      this.result = JSON.stringify(result, null, '\t')

      resultTextArea.classList.remove('is-loading')
    }
  },
  computed: {
    parsedQuery () {
      try {
        if (this.query) {
          return JSON.parse(this.query)
        } else {
          return true
        }
      } catch (error) {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

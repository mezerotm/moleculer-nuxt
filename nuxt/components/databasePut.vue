<template lang="pug">

        b-collapse.card(:open="false")
            .card-header(slot="trigger" slot-scope="props")
                .card-header-title Database Put
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
                label="Schema"
                :type="parsedSchema ? '' : 'is-danger'"
                :message="parsedSchema ? '' : 'Invalid JSON'"
                horizontal
                )
                    b-input(
                    v-model="schema"
                    type="textarea"
                    rows=5
                    placeholder=`{\n\t"username": {\n\t\t"type": "String"\n\t}\n}`
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
      schema: null,
      result: ''
    }
  },
  methods: {
    async submitForm () {
      const resultTextArea = document.querySelector('#result')
      resultTextArea.classList.add('is-loading')

      const result = await this.$axios.$put('/database', {
        model: this.model,
        // TODO: check for security risk
        schema: this.parsedSchema
      })

      this.result = JSON.stringify(result, null, '\t')

      resultTextArea.classList.remove('is-loading')
    }
  },
  computed: {
    parsedSchema () {
      try {
        if (this.schema) {
          return JSON.parse(this.schema)
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

<template>
  <v-card>
    <v-card-title>Editing {{ site.name }}</v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field v-model="name" label="Name" />
        <v-text-field v-model="email" label="Email" />
        <v-slider
          v-model="age"
          min="18"
          max="99"
          :label="`Age: ${age}`"
          thumb-label
        />
        <v-layout flex justify-space-between>
          <v-btn color="error" @click="$emit('close')" :loading="sitesLoading">
            Cancel
          </v-btn>
          <v-btn color="success" @click="submit()" :loading="sitesLoading">
            Submit
          </v-btn>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { loadingStates } from '../../mixins/loading-state'

export default {
  name: 'EditSiteForm',
  mixins: [loadingStates],

  props: {
    site: {
      type: Object,
      require: true,
    },
  },

  data: () => ({
    name: '',
    age: 0,
    email: '',
  }),

  methods: {
    async submit() {
      try {
        const siteUpdate = {
          ...this.site,
          name: this.name,
          age: this.age,
          email: this.email,
        }

        await this.$store.dispatch('sites/Update', {
          id: this.site._id,
          data: siteUpdate,
        })

        this.$emit('success', siteUpdate)
      } catch (error) {
        console.error(error)
        this.$emit('error', { error })
      }
    },
  },

  mounted() {
    this.name = this.site.name
    this.age = this.site.age
    this.email = this.site.email
  },

  beforeDestroy() {
    this.name = ''
    this.age = 0
    this.email = ''
  },
}
</script>

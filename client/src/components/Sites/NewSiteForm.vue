<template>
  <v-card>
    <v-card-title class="primary bright--text">Add New Site</v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field v-model="name" label="Name" />
        <v-text-field v-model="title" label="Title" />
        <v-text-field v-model="site_id" label="Site ID" />
        <v-text-field v-model="terrain_type" label="Terrain Type" />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn color="error" @click="$emit('close')" :loading="sitesLoading">
        Cancel
      </v-btn>

      <v-spacer />

      <v-btn color="success" @click="submit()" :loading="sitesLoading">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { loadingStates } from '../../mixins/loading-state'

export default {
  name: 'NewSiteForm',
  mixins: [loadingStates],

  data: () => ({
    name: 'default',
    title: 'Default',
    site_id: 0,
    terrain_type: 'default',
  }),

  methods: {
    async submit() {
      try {
        const newSite = {
          name: this.name,
          title: this.title,
          site_id: this.site_id,
          terrain_type: this.terrain_type,
        }

        await this.$store.dispatch('sites/Add', newSite)

        this.$emit('success', newSite)
      } catch (error) {
        console.error(error)
        this.$emit('error', { error })
      }
    },
  },
}
</script>

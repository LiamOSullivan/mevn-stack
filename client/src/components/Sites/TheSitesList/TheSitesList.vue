<template>
  <div>
    <v-list rounded flat two-line class="transparent">
      <sites-list-row v-for="site in sites" :key="site.site_id" :site="site" />
    </v-list>
  </div>
</template>

<script>
import SitesListRow from './SitesListRow.vue'

export default {
  name: 'TheSitesList',

  components: {
    SitesListRow,
  },

  data: () => ({
    // sites: [],
  }),

  computed: {
    sites() {
      return this.$store.getters['sites/Sites'] || []
    },
  },

  methods: {
    fetchSites() {
      this.$store.dispatch('sites/GetAll')
    },
  },

  mounted() {
    this.fetchSites()
  },
}
</script>

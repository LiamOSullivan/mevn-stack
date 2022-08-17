<template>
  <div class="page-content">
    <v-layout justify-space-between align-content-center column>
      <v-layout justify-space-between align-content-center>
        <h2>Sites</h2>
        <v-btn color="success" @click="showAddModal()" :loading="usersLoading">
          Add Site
        </v-btn>
      </v-layout>
      <the-sites-list class="mt-5" />
    </v-layout>
  </div>
</template>

<script>
import TheSitesList from '../components/Sites/TheSitesList/TheSitesList.vue'
import NewSiteForm from '../components/Sites/NewSiteForm.vue'
import { loadingStates } from '../mixins/loading-state'
import { ModalService } from '../services/modal.service'

export default {
  name: 'SitesPage',
  mixins: [loadingStates],

  components: {
    TheSitesList,
  },

  data: () => ({
    // showAddModal: false,
  }),

  methods: {
    // toggleAddModal(show) {
    //   this.showAddModal = !!show
    // },

    showAddModal() {
      ModalService.openGenericModal(NewSiteForm)
    },
  },
}
</script>

<style></style>

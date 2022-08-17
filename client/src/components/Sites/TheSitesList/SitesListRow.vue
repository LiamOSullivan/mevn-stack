<template>
  <v-list-item class="site-row elevation-2">
    <v-layout row align-content-center justify-space-between pa-3>
      <div class="d-flex flex-column align-start pl-1">
        {{ site.name }}: {{ site.age }}
        <div class="d-flex">
          {{ site.email }}
        </div>
      </div>
      <div class="d-flex align-center">
        <v-btn
          @click="openDeleteModal()"
          class="error bright--text align-self-center mr-2"
          icon
          :loading="sitesLoading"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>

        <v-btn
          @click="openEditModal()"
          class="accent bright--text align-self-center"
          icon
          :loading="sitesLoading"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
    </v-layout>

    <!-- <modal :show="showAddModal" @close="toggleAddModal">
      <template v-slot:modal-header>Edit site</template>
      <template v-slot:modal-body>
        <edit-site-form
          :site="site"
          @add-site-success="toggleAddModal(false)"
          @add-site-error="toggleAddModal(false)"
          @close="toggleAddModal"
        />
      </template>
    </modal> -->
  </v-list-item>
</template>

<script>
import { loadingStates } from '../../../mixins/loading-state'
import { ModalService } from '../../../services/modal.service'
import EditSiteForm from '../EditSiteForm.vue'

export default {
  name: 'SiteListRow',
  mixins: [loadingStates],

  props: {
    site: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    showAddModal: false,
    showConfirmModal: false,
  }),

  methods: {
    toggleAddModal(show) {
      this.showAddModal = !!show
    },

    openEditModal() {
      ModalService.openGenericModal(EditSiteForm, { site: this.site })
    },

    openDeleteModal() {
      console.log(this.site)
      ModalService.openConfirmModal({
        loading: () => this.$store.getters['sites/Loading'],
        destructive: true,
        heading: `Delete Site "${this.site.name}"?`,
        body: `"${this.site.name}" will be permanently deleted.`,
        id: this.site._id,
      })
    },
  },
}
</script>

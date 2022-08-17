export const loadingStates = {
  computed: {
    usersLoading() {
      return this.$store.getters['users/Loading']
    },
    sitesLoading() {
      return this.$store.getters['sites/Loading']
    },
  },
}

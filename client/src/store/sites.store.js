import { SitesService } from '../services/sites.service'

const sitesGetterTypes = {
  sites: 'Sites',
  loading: 'Loading',
}

const sitesMutationTypes = {
  setLoading: 'SetLoading',
  setSuccess: 'SetSuccess',
  setError: 'SetError',
}

const sitesActionTypes = {
  get: 'GetAll',
  add: 'Add',
  update: 'Update',
  delete: 'Delete',
}

const state = () => ({
  records: undefined,
  loading: false,
})

const getters = {
  [sitesGetterTypes.sites]: (state) => state.records,
  [sitesGetterTypes.loading]: (state) => state.loading,
}

const mutations = {
  [sitesMutationTypes.setLoading](state) {
    state.loading = true
  },

  [sitesMutationTypes.setSuccess](state, siteRecords) {
    state.records = siteRecords
    state.loading = false
  },

  [sitesMutationTypes.setError](state) {
    state.records = []
    state.loading = false
  },
}

const actions = {
  async [sitesActionTypes.get]({ state, commit }, bustCache) {
    if (state.records && !bustCache) {
      return
    }

    commit(sitesMutationTypes.setLoading)

    try {
      const response = await SitesService.get()
      commit(sitesMutationTypes.setSuccess, response.data.sites)
    } catch (error) {
      console.error(error)
      commit(sitesMutationTypes.setError)
    }
  },

  async [sitesActionTypes.add]({ dispatch, commit }, siteData) {
    commit(sitesMutationTypes.setLoading)

    try {
      await SitesService.post(siteData)
      dispatch(sitesActionTypes.get, true)
    } catch (error) {
      console.error(error)
      commit(sitesMutationTypes.setError)
    }
  },

  async [sitesActionTypes.update]({ dispatch, commit }, payload) {
    commit(sitesMutationTypes.setLoading)

    try {
      await SitesService.put(payload.id, payload.data)
      await dispatch(sitesActionTypes.get, true)
    } catch (error) {
      console.error(error)
      commit(sitesMutationTypes.setError)
    }
  },

  async [sitesActionTypes.delete]({ dispatch, commit }, id) {
    commit(sitesMutationTypes.setLoading)

    try {
      await SitesService.delete(id)
      await dispatch(sitesActionTypes.get, true)
    } catch (error) {
      console.error(error)
      await dispatch(sitesActionTypes.get, true)
    }
  },
}

export const sitesStoreModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

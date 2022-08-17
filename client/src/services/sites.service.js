import axios from 'axios'

export const SitesService = {
  http: axios.create({
    baseURL: 'http://localhost:3000/api/sites',
  }),
  get() {
    return this.http.get()
  },
  post(siteData) {
    return this.http.post('', siteData)
  },
  put(id, siteData) {
    return this.http.put(`/${id}`, siteData)
  },
  delete(id) {
    return this.http.delete(`/${id}`)
  },
}

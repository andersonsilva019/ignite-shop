import axios from "axios"
import { api } from "./axios"

const CancelIncrementalTimesAccessedToken = axios.CancelToken

let cancelIncrementalTimesAccessed: any = null

export const ApiServices = {
  async incrementalTimesAccessed(productId: string) {
    const response = await api.post('/incremental-times-accessed-products', { productId }, {
      cancelToken: new CancelIncrementalTimesAccessedToken((cancelFn) => {
        cancelIncrementalTimesAccessed = cancelFn
      })
    })
    return response.data
  },

  async moreAccessedProducts(quantity: number) {
    const response = await api.get(`/more-accessed-products?quantity=${quantity}`)
    return response.data
  }
}

export  { cancelIncrementalTimesAccessed }